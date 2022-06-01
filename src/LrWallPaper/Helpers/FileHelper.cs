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
}
