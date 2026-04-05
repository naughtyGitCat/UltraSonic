# References

Development resources and articles referenced during the initial design and implementation of UltraSonic.

---

## Mobile Device Communication

1. [Android 获取手机设备信息（厂商，型号等）](https://blog.csdn.net/K_Hello/article/details/108316726)
   > Android 端获取设备厂商、型号、序列号等硬件信息的方法汇总

2. [Is there a native way to detect android os? - .NET Runtime Discussion #60539](https://github.com/dotnet/runtime/discussions/60539)
   > .NET 运行时讨论：如何在 C# 中原生检测 Android 操作系统

3. [How to get android phone serial number and IMEI using C#](https://learn.microsoft.com/en-us/answers/questions/710160/how-to-get-android-phone-serial-number-and-imei-of)
   > Microsoft Q&A：通过 C# 获取 Android 手机序列号和 IMEI

4. [Netimobiledevice - A C#/.NET library for iOS devices](https://github.com/artehe/Netimobiledevice)
   > 纯 C# 实现的 iOS 设备通信库，支持 Usbmux、AFC 文件访问等协议

5. [libimobiledevice - Cross-platform iOS communication library](https://github.com/libimobiledevice/libimobiledevice)
   > 跨平台 iOS 设备通信协议库（C 语言），UltraSonic 参考其协议实现

6. [关于几种获取 iOS 设备 UDID 典型方式的技术探讨](https://www.cnblogs.com/mapboo/p/14093867.html)
   > 获取 iOS 设备唯一标识符（UDID）的几种方法对比与实现

7. [imobiledevice-net - iDeviceNativeMethods.cs](https://github.com/libimobiledevice-win32/imobiledevice-net/blob/master/iMobileDevice-net/iDevice/iDeviceNativeMethods.cs)
   > libimobiledevice 的 .NET 绑定，P/Invoke 原生方法定义参考

---

## Device Identification & USB

8. [Instance IDs - Windows Drivers](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/instance-ids)
   > Windows 驱动程序中 Instance ID 的定义和用途

9. [Is the USB Instance ID on Windows unique for a device?](https://stackoverflow.com/questions/51513337/is-the-usb-instance-id-on-windows-unique-for-a-device)
   > Windows USB 设备 Instance ID 的唯一性讨论

10. [Linux shell - get device id from user input](https://unix.stackexchange.com/questions/446432/linux-shell-get-device-id-from-user-input)
    > Linux 下通过 shell 获取设备 ID 的方法

11. [Where do Windows Product ID and Device ID values come from?](https://stackoverflow.com/questions/47603786/where-do-windows-product-id-and-device-id-values-come-from-are-they-useful)
    > Windows Product ID 和 Device ID 的来源与用途分析

12. [How do I get a unique identifier for a device within Windows 10 Universal?](https://stackoverflow.com/questions/31746613/how-do-i-get-a-unique-identifier-for-a-device-within-windows-10-universal)
    > UWP 应用中获取设备唯一标识符的方法

---

## File I/O & Directory Operations

13. [How to read files on Android phone from C# program on Windows 7](https://stackoverflow.com/questions/25026799/how-to-read-files-on-android-phone-from-c-sharp-program-on-windows-7)
    > C# 通过 MTP/WPD 协议读取 Android 手机文件

14. [How to: Copy directories - .NET](https://learn.microsoft.com/en-us/dotnet/standard/io/how-to-copy-directories)
    > .NET 官方文档：递归复制目录的标准实现方式

---

## Lightroom Catalog & SQLite

15. [Opening Lightroom Catalog database using SQLite](https://www.dpreview.com/forums/threads/opening-lightroom-catalog-database-using-sqlite.4358462/)
    > 使用 SQLite 工具直接打开和查询 Lightroom 目录数据库

16. [How to Search Multiple Lightroom Catalogs at Once with SQL Tools](https://petapixel.com/2019/05/08/how-to-search-multiple-lightroom-catalogs-at-once-with-sql-tools/)
    > 用 SQL 工具同时搜索多个 Lightroom 目录的照片元数据

17. [Scripting and querying Lightroom's database](https://www.lightroomqueen.com/community/threads/scripting-and-querying-lightrooms-database.22420/)
    > Lightroom 数据库的表结构分析和 SQL 查询示例

---

## Desktop Wallpaper (C# / .NET)

18. [Temporarily set a desktop wallpaper without polluting the Windows settings history](https://gist.github.com/Drarig29/4aa001074826f7da69b5bb73a83ccd39)
    > 通过 SystemParametersInfo API 临时设置壁纸而不影响 Windows 壁纸历史

19. [Change desktop wallpaper using code in .NET](https://stackoverflow.com/questions/1061678/change-desktop-wallpaper-using-code-in-net)
    > .NET 中使用 P/Invoke 调用 Win32 API 更换桌面壁纸

20. [How do I change my Windows desktop wallpaper programmatically?](https://stackoverflow.com/questions/8414635/how-do-i-change-my-windows-desktop-wallpaper-programmatically)
    > 编程方式更换 Windows 桌面壁纸的多种实现方案

21. [Change desktop wallpaper C#](https://stackoverflow.com/questions/16376394/change-desktop-wallpaper-c-sharp)
    > C# 设置桌面壁纸的 SystemParametersInfo 调用示例

22. [Change desktop background in C#](https://stackoverflow.com/questions/31562213/change-desktop-background-in-c-sharp)
    > C# 更换桌面背景并处理图片格式转换（BMP 要求）

23. [Set the wallpaper by code](https://code.4noobz.net/set-the-wallpaper-by-code/)
    > 代码设置壁纸的完整教程，含 WallpaperStyle 和 TileWallpaper 注册表

24. [How do I change the desktop background using C#](https://www.codeproject.com/Questions/1252479/How-do-I-change-the-desktop-background-using-Cshar)
    > CodeProject Q&A：C# 更换桌面背景的兼容性方案
