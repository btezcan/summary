// With no more input, ReadLine returns null
string? line = Console.ReadLine();
if (line is null)
    Console.WriteLine("no input");
else
    Console.WriteLine(line.ToUpper());
