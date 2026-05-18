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

.NOTES
  Run elevated (writes under C:\Program Files). Machine-local: run it
  on the box being deployed (for Z690 invoke it via WinRM).
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

  # How the Agent is launched on this host
  [ValidateSet('Process', 'ScheduledTask')]
  [string]$AgentStart    = 'Process',
  [string]$ScheduledTaskName = 'UltraSonic Agent',

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

function Start-AgentProc {
  if ($AgentStart -eq 'ScheduledTask') {
    Log "Starting Agent via scheduled task '$ScheduledTaskName'..."
    Start-ScheduledTask -TaskName $ScheduledTaskName
  } else {
    Log "Starting Agent process..."
    Start-Process -FilePath (Join-Path $InstallAgent $AgentExe) -WorkingDirectory $InstallAgent
  }
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

if ($doMaster) {
  Log "Starting Master..."
  Start-Process -FilePath (Join-Path $InstallMaster $MasterExe) -WorkingDirectory $InstallMaster
}
if ($doAgent) { Start-AgentProc }

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
