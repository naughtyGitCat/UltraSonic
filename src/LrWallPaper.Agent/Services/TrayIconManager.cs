using Microsoft.Win32;
using System.Diagnostics;
using System.Drawing;
using System.Windows.Forms;

namespace LrWallPaper.Agent.Services;

public class TrayIconManager
{
    private readonly AgentState _agentState;
    private readonly IHostApplicationLifetime _lifetime;
    private readonly ILogger<TrayIconManager> _logger;

    private Thread? _trayThread;
    private NotifyIcon? _notifyIcon;

    public TrayIconManager(AgentState agentState, IHostApplicationLifetime lifetime, ILogger<TrayIconManager> logger)
    {
        _agentState = agentState;
        _lifetime = lifetime;
        _logger = logger;
    }

    public void Start()
    {
        _trayThread = new Thread(() =>
        {
            Application.SetHighDpiMode(HighDpiMode.SystemAware);
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            Icon trayIcon;
            using (var stream = typeof(TrayIconManager).Assembly.GetManifestResourceStream("LrWallPaper.Agent.agent.ico"))
            {
                trayIcon = stream != null ? new Icon(stream) : (Icon.ExtractAssociatedIcon(Application.ExecutablePath) ?? SystemIcons.Application);
            }

            _notifyIcon = new NotifyIcon
            {
                Icon = trayIcon,
                Text = "UltraSonic Agent",
                Visible = true
            };

            var contextMenu = new ContextMenuStrip();

            var statusItem = new ToolStripMenuItem("状态: 运行中 (Running)");
            statusItem.Enabled = false;

            var openConfigItem = new ToolStripMenuItem("打开配置 (Open Config)");
            openConfigItem.Click += (s, e) =>
            {
                try
                {
                    Process.Start(new ProcessStartInfo("notepad.exe", "appsettings.json") { UseShellExecute = true });
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to open config file");
                }
            };

            var toggleScanningItem = new ToolStripMenuItem("暂停扫描 (Pause Scanning)");
            toggleScanningItem.Click += (s, e) =>
            {
                _agentState.IsScanningEnabled = !_agentState.IsScanningEnabled;
                toggleScanningItem.Text = _agentState.IsScanningEnabled ? "暂停扫描 (Pause Scanning)" : "恢复扫描 (Resume Scanning)";
                UpdateStatus(statusItem);
            };

            var toggleRequestsItem = new ToolStripMenuItem("暂停请求 (Pause Requests)");
            toggleRequestsItem.Click += (s, e) =>
            {
                _agentState.IsRequestEnabled = !_agentState.IsRequestEnabled;
                toggleRequestsItem.Text = _agentState.IsRequestEnabled ? "暂停请求 (Pause Requests)" : "恢复请求 (Resume Requests)";
                UpdateStatus(statusItem);
            };

            var startAllItem = new ToolStripMenuItem("开启全部 (Start All)");
            startAllItem.Click += (s, e) =>
            {
                _agentState.IsScanningEnabled = true;
                _agentState.IsRequestEnabled = true;
                toggleScanningItem.Text = "暂停扫描 (Pause Scanning)";
                toggleRequestsItem.Text = "暂停请求 (Pause Requests)";
                UpdateStatus(statusItem);
            };

            var startupItem = new ToolStripMenuItem("开机自启动 (Run on Startup)")
            {
                CheckOnClick = true
            };
            try
            {
                startupItem.Checked = IsStartupEnabled();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to read startup registry");
                startupItem.Enabled = false;
            }

            startupItem.CheckedChanged += (s, e) =>
            {
                try
                {
                    SetStartup(startupItem.Checked);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to toggle startup");
                    MessageBox.Show("设置开机启动失败: " + ex.Message, "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            };

            var exitItem = new ToolStripMenuItem("退出 (Exit)");
            exitItem.Click += (s, e) =>
            {
                _logger.LogInformation("Exiting via Tray Icon...");
                if (_notifyIcon != null)
                {
                    _notifyIcon.Visible = false;
                }
                Application.Exit();
                _lifetime.StopApplication();
            };

            contextMenu.Items.Add(statusItem);
            contextMenu.Items.Add(new ToolStripSeparator());
            contextMenu.Items.Add(startAllItem);
            contextMenu.Items.Add(toggleScanningItem);
            contextMenu.Items.Add(toggleRequestsItem);
            contextMenu.Items.Add(new ToolStripSeparator());
            contextMenu.Items.Add(startupItem);
            contextMenu.Items.Add(openConfigItem);
            contextMenu.Items.Add(new ToolStripSeparator());
            contextMenu.Items.Add(exitItem);

            _notifyIcon.ContextMenuStrip = contextMenu;

            Application.Run();
        });

        _trayThread.SetApartmentState(ApartmentState.STA);
        _trayThread.IsBackground = true;
        _trayThread.Start();
    }

    private bool IsStartupEnabled()
    {
        using var key = Registry.CurrentUser.OpenSubKey(@"SOFTWARE\Microsoft\Windows\CurrentVersion\Run", false);
        return key?.GetValue("LrWallPaperAgent") != null;
    }

    private void SetStartup(bool enable)
    {
        using var key = Registry.CurrentUser.OpenSubKey(@"SOFTWARE\Microsoft\Windows\CurrentVersion\Run", true);
        if (key != null)
        {
            if (enable)
            {
                var exePath = Process.GetCurrentProcess().MainModule?.FileName ?? Application.ExecutablePath;
                key.SetValue("LrWallPaperAgent", $"\"{exePath}\"");
            }
            else
            {
                key.DeleteValue("LrWallPaperAgent", false);
            }
        }
    }

    private void UpdateStatus(ToolStripMenuItem statusItem)
    {
        if (_agentState.IsScanningEnabled && _agentState.IsRequestEnabled)
        {
            statusItem.Text = "状态: 运行中 (Running)";
        }
        else if (!_agentState.IsScanningEnabled && !_agentState.IsRequestEnabled)
        {
            statusItem.Text = "状态: 已全部暂停 (Paused All)";
        }
        else if (!_agentState.IsScanningEnabled)
        {
            statusItem.Text = "状态: 扫描暂停, 请求开启 (Scan Paused)";
        }
        else
        {
            statusItem.Text = "状态: 扫描开启, 请求暂停 (Requests Paused)";
        }
    }

    public void Stop()
    {
        if (_notifyIcon != null)
        {
            _notifyIcon.Visible = false;
            _notifyIcon.Dispose();
        }
        // Safely exit the WinForms message loop
        if (Application.MessageLoop)
        {
            Application.Exit();
        }
    }
}
