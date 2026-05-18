# Deploy

`deploy.ps1` is a machine-local, version-skew-tolerant deployer. It
**gracefully stops the Agent** (POST `/api/agent/shutdown` → wait for
the process to exit so an in-flight multi-GB `File.Move` finishes
instead of being truncated) before swapping binaries. The Master has
no risky file I/O and is restarted normally.

If the running Agent predates the `/api/agent/shutdown` endpoint, the
script automatically falls back to polling `/api/agent/archive-status`
until the archive job is idle (no in-flight move), then stops it.

## Build artifacts

```
dotnet publish src/LrWallPaper/LrWallPaper.csproj -c Release -r win-x64 --self-contained false -o $env:TEMP\publish-master
dotnet publish src/LrWallPaper.Agent/LrWallPaper.Agent.csproj -c Release -r win-x64 --self-contained false -o $env:TEMP\publish-agent
```

## Local (BARONCELLI — Master + Agent), elevated

```powershell
Start-Process powershell -Verb RunAs -ArgumentList `
  '-ExecutionPolicy Bypass -File E:\Code\UltraSonic\deploy\deploy.ps1 -Component Both'
```

## Z690 (Agent only, started by a Scheduled Task) — via WinRM

`Invoke-Command -FilePath ... -ArgumentList` binds **positionally**
and cannot pass named parameters. Stage the script + binaries on
Z690 and invoke it inside a script block with named args:

```powershell
$s = New-PSSession -ComputerName Z690
Invoke-Command -Session $s -ScriptBlock { New-Item -ItemType Directory -Force 'C:\Temp\publish-agent' | Out-Null }
Copy-Item "$env:TEMP\publish-agent\*" 'C:\Temp\publish-agent\' -ToSession $s -Recurse -Force
Copy-Item 'E:\Code\UltraSonic\deploy\deploy.ps1' 'C:\Temp\deploy.ps1' -ToSession $s -Force
Invoke-Command -Session $s -ScriptBlock {
  & 'C:\Temp\deploy.ps1' -Component Agent -PublishAgent 'C:\Temp\publish-agent' -AgentStart ScheduledTask
}
Remove-PSSession $s
```

The script preserves `appsettings.json` and `logs/` across the sync.

## Safety caps

- `-GracefulExitTimeout` (default 900s) — wait for process exit after
  `/shutdown`; covers a large in-flight move. Host
  `ShutdownTimeout` is 10 min. Only exceeded if something hangs →
  flagged force-kill.
- `-IdleWaitTimeout` (default 1800s) — fallback wait for archive idle
  on pre-graceful Agent builds.
