using System.Security.Cryptography;
using System.Text;

namespace LrWallPaper.Helpers
{
    public static class FileHelper
    {
        public static void MoveFile(string source, string destination)
        {
            //move if directories are on the same volume
            if (Path.GetPathRoot(source) == Path.GetPathRoot(destination))
            {
                Directory.Move(source, destination);
            }
            else
            {
                if (!File.Exists(source) ||Directory.Exists(source)) throw new NotFiniteNumberException("not implement for dir type source");
                if (!File.Exists(destination) || Directory.Exists(destination)) throw new NotFiniteNumberException("not implement for dir type destination");
                // https://stackoverflow.com/questions/58744/copy-the-entire-contents-of-a-directory-in-c-sharp
                // CopyFilesRecursively(source, destination);
                Directory.Delete(source, true);
            }
        }
        public static string GetMD5(string fileName)
        {
            //新建文件流
            using FileStream file = new(fileName, FileMode.Open);
            //MD5加密服务提供器
            var md5 = MD5.Create();

            //对文件进行计算MD5
            byte[] retVal = md5.ComputeHash(file);

            //保存输出结果
            var sb = new StringBuilder();
            //转为2进制
            for (int i = 0; i < retVal.Length; i++)
            {
                sb.Append(retVal[i].ToString("x2"));
            }

            return sb.ToString();
        }

        public static IEnumerable<string> GetFilesRecursively(string directory)
        {
            IEnumerable<string> allFiles = Array.Empty<string>();
            try
            {
                var files = Directory.GetFiles(directory, "*.*");
                allFiles = allFiles.Union(files);
            }
            // when unauthorized access exception, do not handle
            catch (UnauthorizedAccessException){}
            try
            {
                var dirs = Directory.GetDirectories(directory, "*.*");
                foreach (var d in dirs)
                {
                    allFiles = allFiles.Union(GetFilesRecursively(d));
                }
            }
            // when unauthorized access exception, do not handle
            catch (UnauthorizedAccessException) {}
            return allFiles;
        }
        
        public static IEnumerable<string> GetFilesRecursively(string directory, string[] ignorePathPatterns)
        {
            IEnumerable<string> allFiles = Array.Empty<string>();
            if (ignorePathPatterns.Any(directory.Contains)) return allFiles;
            try
            {
                var files = Directory.GetFiles(directory, "*.*");
                allFiles = allFiles.Union(files);
            }
            // when unauthorized access exception, do not handle
            catch (UnauthorizedAccessException){}
            try
            {
                var dirs = Directory.GetDirectories(directory, "*.*");
                foreach (var d in dirs)
                {
                    allFiles = allFiles.Union(GetFilesRecursively(d));
                }
            }
            // when unauthorized access exception, do not handle
            catch (UnauthorizedAccessException) {}
            return allFiles;
        }
    }
    
    public static class DirectoryHelper
    {
        public static void CopyDirectory(string originPath, string targetPath,bool recursively)
        {
            var targetDir = Directory.CreateDirectory(targetPath);

            if (recursively) throw new NotImplementedException();
            
            foreach (var filePath in Directory.GetFiles(originPath))
            {
                var file = new FileInfo(filePath);
                File.Copy(filePath, Path.Combine(targetDir.FullName, file.Name), true);
            }
        }
    }
}
