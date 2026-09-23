Directory.CreateDirectory("notes");
foreach (string name in new[] { "b.txt", "a.txt", "c.md" })
    File.WriteAllText(Path.Combine("notes", name), name);

var texts = Directory.GetFiles("notes", "*.txt")
    .Select(Path.GetFileName)
    .Order();
Console.WriteLine(string.Join(", ", texts));
Console.WriteLine(File.Exists("notes/c.md"));
