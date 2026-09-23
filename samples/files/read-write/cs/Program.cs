string path = Path.Combine("data", "g.txt");
Directory.CreateDirectory("data");
File.WriteAllLines(path,
    new[] { "Ali,85", "Ayşe,92", "Can,58" });

foreach (string line in File.ReadAllLines(path))
{
    string[] parts = line.Split(',');
    string name = parts[0], score = parts[1];
    Console.WriteLine($"{name,-6}{score,4}");
}
