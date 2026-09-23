using (var writer = new StreamWriter("log.txt"))
{
    writer.WriteLine("first");
    writer.WriteLine("second");
}   // closed and flushed here

using var reader = new StreamReader("log.txt");
string? line;
while ((line = reader.ReadLine()) is not null)
    Console.WriteLine($"> {line}");
