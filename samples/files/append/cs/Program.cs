File.WriteAllText("log.txt", "");
foreach (string who in new[] { "Ali", "Can" })
    File.AppendAllText("log.txt", who + "\n");

Console.Write(File.ReadAllText("log.txt"));
