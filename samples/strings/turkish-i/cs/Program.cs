using System.Globalization;

var tr = new CultureInfo("tr-TR");
string cmd = "exit";

Console.WriteLine(cmd.ToUpper(tr));
Console.WriteLine(cmd.ToUpperInvariant());
Console.WriteLine("İ".ToLower(tr));
Console.WriteLine(string.Equals("FILE", "file",
    StringComparison.OrdinalIgnoreCase));
