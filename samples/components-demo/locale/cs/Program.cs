using System.Globalization;

// The culture is set explicitly here.
var tr = new CultureInfo("tr-TR");
Console.WriteLine("exit".ToUpper(tr));
Console.WriteLine("exit".ToUpperInvariant());
Console.WriteLine(3.5.ToString(tr));
