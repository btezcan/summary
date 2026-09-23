File.WriteAllText("a.txt", "one\n");
File.WriteAllText("a.txt", "two\n");
File.AppendAllText("a.txt", "three\n");
Console.Write(File.ReadAllText("a.txt"));
