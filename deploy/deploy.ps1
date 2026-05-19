<#
.SYNOPSIS
  Safe, version-skew-tolerant deployer for UltraSonic Master / Agent.

.DESCRIPTION
  The Agent runs a device-archive job that performs multi-GB File.Move
  operations. Force-killing it mid-move truncates files (data loss in
  move mode). This script therefore stops the Agent *gracefully*:

    1. POST /api/agent/shutdown  -> host cancels the stopping token,
       the archive job stops at a file boundary, the in-flight move
       finishes, the process exits on its own.
    2. Poll until the process is actually gone (generous timeout that
       covers a large in-flight move; HostOptions.ShutdownTimeout=10m).
    3. Only if it overruns the hard cap, force-kill as a flagged
       last resort.

  Version skew is handled: if the running Agent predates the
  /api/agent/shutdown endpoint, the script falls back to polling
  /api/agent/archive-status until the job is idle (no in-flight
  move) and only then stops the process. Oldest builds with neither
  endpoint fall back to a plain stop.

  The Master has no risky file I/O (SQLite is transactional), so it
  is simply stopped and restarted.

  Boot autostart is institutionalized: every deploy idempotently
  (re)creates a per-component Scheduled Task (AtStartup + AtLogon,
  Interactive + Highest, restart-on-failure) and removes the legacy
  fragile HKCU\Run entry. The app is both started-now and started-at-
  boot through the same task, so "how it runs now" == "how it comes
  back after a reboot".

.NOTES
  Run elevated (writes under C:\Program Files, registers tasks).
  Machine-local: run it on the box being deployed (for Z690 invoke
  it via WinRM). Default principal is the current user ($env:USERNAME);
  override with -RunAsUser when deploying remotely as a different user.
#>
[CmdletBinding()]
param(
  [ValidateSet('Master', 'Agent', 'Both')]
  [string]$Component = 'Both',

  [string]$PublishMaster = "$env:TEMP\publish-master",
  [string]$PublishAgent  = "$env:TEMP\publish-agent",
  [string]$InstallMaster = 'C:\Program Files\UltraSonic\LrWallPaper',
  [string]$InstallAgent  = 'C:\Program Files\UltraSonic\LrWallPaper.Agent',

  [string]$AgentBaseUrl  = 'http://localhost:5282',
  [string]$MasterExe     = 'LrWallPaper.exe',
  [string]$AgentExe      = 'LrWallPaper.Agent.exe',

  # Boot autostart is a per-component Scheduled Task (AtStartup + AtLogon,
  # Interactive + Highest). A Windows Service is intentionally NOT used:
  # these are WinExe + WinForms tray apps and fail in Session 0.
  [string]$MasterTaskName = 'UltraSonic Master',
  [string]$AgentTaskName  = 'UltraSonic Agent',
  [string]$RunAsUser      = "$env:USERNAME",

  # Hard caps (seconds)
  [int]$GracefulExitTimeout = 900,   # wait for process exit after /shutdown (covers a big in-flight move)
  [int]$IdleWaitTimeout     = 1800   # fallback: wait for archive idle on pre-graceful builds
)

$ErrorActionPreference = 'Stop'
function Log($m) { Write-Host ("[{0}] {1}" -f (Get-Date -Format HH:mm:ss), $m) }

function Get-Proc([string]$exe) {
  Get-Process -Name ([IO.Path]::GetFileNameWithoutExtension($exe)) -ErrorAction SilentlyContinue
}

# Returns: @{ Ok=$bool; Status=[int]; Body=$string } ; Status=0 means unreachable
function Invoke-AgentApi([string]$path, [string]$method = 'GET') {
  try {
    $r = Invoke-WebRequest -Uri "$AgentBaseUrl$path" -Method $method -TimeoutSec 6 -UseBasicParsing
    return @{ Ok = $true; Status = [int]$r.StatusCode; Body = $r.Content }
  } catch {
    $resp = $_.Exception.Response
    if ($resp -and $resp.StatusCode) { return @{ Ok = $false; Status = [int]$resp.StatusCode; Body = '' } }
    return @{ Ok = $false; Status = 0; Body = '' }   # connection refused / DNS / timeout
  }
}

function Wait-ProcExit([string]$exe, [int]$timeoutSec) {
  $sw = [Diagnostics.Stopwatch]::StartNew()
  while ($sw.Elapsed.TotalSeconds -lt $timeoutSec) {
    if (-not (Get-Proc $exe)) { return $true }
    Start-Sleep 5
  }
  return $false
}

function Stop-AgentGracefully {
  $p = Get-Proc $AgentExe
  if (-not $p) { Log "Agent not running."; return }

  Log "Requesting graceful Agent shutdown ($AgentBaseUrl/api/agent/shutdown)..."
  $sd = Invoke-AgentApi '/api/agent/shutdown' 'POST'

  if ($sd.Ok) {
    Log "Shutdown accepted. Waiting for process to exit (in-flight move finishes first)..."
    if (Wait-ProcExit $AgentExe $GracefulExitTimeout) { Log "Agent exited gracefully."; return }
    Write-Warning "Agent did not exit within ${GracefulExitTimeout}s - forcing (LAST RESORT, possible truncation)."
    Get-Proc $AgentExe | Stop-Process -Force; Start-Sleep 2; return
  }

  # Version skew: running Agent has no /shutdown endpoint.
  Log "No graceful endpoint (HTTP $($sd.Status)). Falling back to idle-wait."
  $as = Invoke-AgentApi '/api/agent/archive-status'
  if ($as.Ok) {
    $sw = [Diagnostics.Stopwatch]::StartNew()
    while ($sw.Elapsed.TotalSeconds -lt $IdleWaitTimeout) {
      $st = $null
      $cur = Invoke-AgentApi '/api/agent/archive-status'
      if ($cur.Ok) { try { $st = $cur.Body | ConvertFrom-Json } catch { } }
      if (-not $st -or -not $st.isArchiving) { Log "Archive idle - safe to stop."; break }
      Log "Archiving ($($st.device), phase=$($st.phase)) - waiting for safe boundary..."
      Start-Sleep 20
    }
  } else {
    Log "No archive-status either - very old build, plain stop is acceptable."
  }
  Get-Proc $AgentExe | Stop-Process -Force; Start-Sleep 2
}

function Stop-MasterPlain {
  $p = Get-Proc $MasterExe
  if (-not $p) { Log "Master not running."; return }
  Log "Stopping Master (no risky I/O; SQLite is transactional)..."
  $p | Stop-Process -Force; Start-Sleep 2
}

function Sync-Dir($src, $dst, [string[]]$xf) {
  $args = @($src, $dst, '/MIR', '/XD', 'logs', '/NJH', '/NJS', '/NP', '/NDL')
  foreach ($f in $xf) { $args += @('/XF', $f) }
  & robocopy @args | Out-Null
  if ($LASTEXITCODE -ge 8) { throw "robocopy failed ($LASTEXITCODE): $src -> $dst" }
}

# Idempotently (re)create the boot-autostart task for a component.
# Triggers: AtStartup (covers autologon hosts) + AtLogon (covers manual
# login). Interactive + Highest so the tray works and it can bind ports
# / write under Program Files. RestartCount gives service-like crash
# recovery without Session 0.
function Ensure-AutostartTask([string]$name, [string]$exePath, [string]$workDir) {
  Log "Ensuring autostart task '$name'..."
  $action  = New-ScheduledTaskAction -Execute $exePath -WorkingDirectory $workDir
  $trigBoot  = New-ScheduledTaskTrigger -AtStartup
  $trigLogon = New-ScheduledTaskTrigger -AtLogOn -User $RunAsUser
  $principal = New-ScheduledTaskPrincipal -UserId $RunAsUser -LogonType Interactive -RunLevel Highest
  $settings  = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
                 -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1) `
                 -ExecutionTimeLimit ([TimeSpan]::Zero) -MultipleInstances IgnoreNew
  Register-ScheduledTask -TaskName $name -Action $action -Trigger $trigBoot, $trigLogon `
    -Principal $principal -Settings $settings -Force | Out-Null
}

# Drop the fragile per-user HKCU\Run entry (login-only, double-start risk).
function Remove-LegacyRunEntry {
  foreach ($n in 'LrWallPaperAgent', 'LrWallPaper', 'UltraSonicAgent') {
    try {
      $k = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
      if (Get-ItemProperty -Path $k -Name $n -ErrorAction SilentlyContinue) {
        Remove-ItemProperty -Path $k -Name $n -Force
        Log "Removed legacy HKCU\Run entry '$n'."
      }
    } catch { }
  }
}

function Start-Component([string]$taskName) {
  Log "Starting via task '$taskName'..."
  Start-ScheduledTask -TaskName $taskName
}

# ---- orchestration ----
$doMaster = $Component -in @('Master', 'Both')
$doAgent  = $Component -in @('Agent', 'Both')

if ($doAgent)  { Stop-AgentGracefully }
if ($doMaster) { Stop-MasterPlain }

if ($doMaster) {
  Log "Syncing Master files..."
  Sync-Dir $PublishMaster $InstallMaster @('ultrasonic.db')
}
if ($doAgent) {
  Log "Syncing Agent files (preserving appsettings.json)..."
  Sync-Dir $PublishAgent $InstallAgent @('appsettings.json')
}

Remove-LegacyRunEntry

if ($doMaster) {
  Ensure-AutostartTask $MasterTaskName (Join-Path $InstallMaster $MasterExe) $InstallMaster
  Start-Component $MasterTaskName
}
if ($doAgent) {
  Ensure-AutostartTask $AgentTaskName (Join-Path $InstallAgent $AgentExe) $InstallAgent
  Start-Component $AgentTaskName
}

Start-Sleep 5
if ($doMaster) {
  $v = [Diagnostics.FileVersionInfo]::GetVersionInfo((Join-Path $InstallMaster $MasterExe)).ProductVersion
  Log "Master deployed: $v"
}
if ($doAgent) {
  $v = [Diagnostics.FileVersionInfo]::GetVersionInfo((Join-Path $InstallAgent $AgentExe)).ProductVersion
  Log "Agent deployed: $v"
}
Log "Done."
