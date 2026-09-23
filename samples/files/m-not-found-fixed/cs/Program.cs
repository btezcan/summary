string path = Path.Combine("data", "a.txt");
if (File.Exists(path))
    Console.WriteLine(File.ReadAllText(path));
else
    Console.WriteLine($"Missing: {path}");
