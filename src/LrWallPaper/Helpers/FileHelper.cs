namespace LrWallPaper.Helpers
{
    public static class FileHelper
    {

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
            if (ignorePathPatterns.Any(directory.Contains)) return Array.Empty<string>();
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
