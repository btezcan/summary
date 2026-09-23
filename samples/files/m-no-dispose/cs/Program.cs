var writer = new StreamWriter("out.txt");
writer.Write("hello");
// forgot to close: the text is still buffered

string text = File.ReadAllText("out.txt");
Console.WriteLine($"[{text}]");
