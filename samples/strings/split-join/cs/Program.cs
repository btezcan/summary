string csv = "Ali;85;Computer Eng.";
string[] parts = csv.Split(';');

Console.WriteLine(parts.Length);
Console.WriteLine(parts[0]);
Console.WriteLine(string.Join(" | ", parts));
