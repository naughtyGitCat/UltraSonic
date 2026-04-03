using System.Diagnostics;
using System.Drawing;
using System.Windows.Forms;

namespace LrWallPaper.Services;

public class MasterTrayIconManager
{
    private readonly IHostApplicationLifetime _lifetime;
    private readonly IConfiguration _configuration;
    private readonly ILogger<MasterTrayIconManager> _logger;

    private Thread? _trayThread;
    private NotifyIcon? _notifyIcon;

    public MasterTrayIconManager(IHostApplicationLifetime lifetime, IConfiguration configuration, ILogger<MasterTrayIconManager> logger)
    {
        _lifetime = lifetime;
        _configuration = configuration;
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
            using (var stream = typeof(MasterTrayIconManager).Assembly.GetManifestResourceStream("LrWallPaper.master.ico"))
            {
                trayIcon = stream != null ? new Icon(stream) : (Icon.ExtractAssociatedIcon(Application.ExecutablePath) ?? SystemIcons.Application);
            }

            _notifyIcon = new NotifyIcon
            {
                Icon = trayIcon,
                Text = "UltraSonic Master",
                Visible = true
            };

            var contextMenu = new ContextMenuStrip();

            // ── Open Web UI ──
            var openWebItem = new ToolStripMenuItem("打开 Web 画廊 (Open Web)");
            openWebItem.Click += (s, e) =>
            {
                try
                {
                    var urls = _configuration["Urls"] ?? "http://localhost:5281";
                    var firstUrl = urls.Split(';').First().Trim();
                    Process.Start(new ProcessStartInfo(firstUrl) { UseShellExecute = true });
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to open web UI");
                }
            };

            // ── Open Config ──
            var openConfigItem = new ToolStripMenuItem("打开配置 (Open Config)");
            openConfigItem.Click += (s, e) =>
            {
                try
                {
                    var configPath = Path.Combine(AppContext.BaseDirectory, "appsettings.json");
                    if (!File.Exists(configPath))
                    {
                        configPath = "appsettings.json";
                    }
                    Process.Start(new ProcessStartInfo("notepad.exe", configPath) { UseShellExecute = true });
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to open config file");
                }
            };

            // ── Reload Config ──
            var reloadItem = new ToolStripMenuItem("重新加载配置 (Reload Config)");
            reloadItem.Click += (s, e) =>
            {
                try
                {
                    if (_configuration is IConfigurationRoot configRoot)
                    {
                        configRoot.Reload();
                        _logger.LogInformation("Configuration reloaded via tray menu.");
                        MessageBox.Show("配置已重新加载！\nConfiguration reloaded!", "UltraSonic Master",
                            MessageBoxButtons.OK, MessageBoxIcon.Information);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to reload configuration");
                }
            };

            // ── Exit ──
            var exitItem = new ToolStripMenuItem("退出 (Exit)");
            exitItem.Click += (s, e) =>
            {
                _logger.LogInformation("Master exiting via Tray Icon...");
                if (_notifyIcon != null)
                {
                    _notifyIcon.Visible = false;
                }
                Application.Exit();
                _lifetime.StopApplication();
            };

            contextMenu.Items.Add(openWebItem);
            contextMenu.Items.Add(new ToolStripSeparator());
            contextMenu.Items.Add(openConfigItem);
            contextMenu.Items.Add(reloadItem);
            contextMenu.Items.Add(new ToolStripSeparator());
            contextMenu.Items.Add(exitItem);

            _notifyIcon.ContextMenuStrip = contextMenu;

            // Double-click tray icon opens web UI
            _notifyIcon.DoubleClick += (s, e) => openWebItem.PerformClick();

            Application.Run();
        });

        _trayThread.SetApartmentState(ApartmentState.STA);
        _trayThread.IsBackground = true;
        _trayThread.Start();
    }

    public void Stop()
    {
        if (_notifyIcon != null)
        {
            _notifyIcon.Visible = false;
            _notifyIcon.Dispose();
        }
        if (Application.MessageLoop)
        {
            Application.Exit();
        }
    }
}
