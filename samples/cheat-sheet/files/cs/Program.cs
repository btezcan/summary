Directory.CreateDirectory("data");
string path = Path.Combine("data", "notes.txt");

File.WriteAllText(path, "one\ntwo\n");
File.AppendAllText(path, "three\n");
string[] lines = File.ReadAllLines(path);
Console.WriteLine(lines.Length);

using (var reader = new StreamReader(path))
{
    string? line;
    while ((line = reader.ReadLine()) != null)
        Console.WriteLine(line.ToUpper());
}
