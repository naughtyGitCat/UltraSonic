namespace LrWallPaper.Helpers
{
    public static class FileHelper
    {

        public static IEnumerable<string> GetFilesRecursively(string directory)
        {
            IEnumerable<string> files = Array.Empty<string>();
            files = files.Union(Directory.GetFiles(directory, "*.*"));
            var dirs = Directory.GetDirectories(directory, "*.*");
            foreach (var d in dirs)
            {
                files = files.Union(GetFilesRecursively(d));
            }
            return files;
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
