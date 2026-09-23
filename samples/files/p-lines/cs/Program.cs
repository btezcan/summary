File.WriteAllText("t.txt", "a\nb\n");
string[] lines = File.ReadAllLines("t.txt");
Console.WriteLine(lines.Length);
Console.WriteLine($"[{lines[0]}]");
