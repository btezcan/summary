using (var writer = new StreamWriter("out.txt"))
{
    writer.Write("hello");
}   // Dispose flushes and closes

string text = File.ReadAllText("out.txt");
Console.WriteLine($"[{text}]");
