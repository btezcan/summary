using System.Globalization;

// Kültür bu örnekte açıkça belirtiliyor.
var tr = new CultureInfo("tr-TR");
Console.WriteLine("exit".ToUpper(tr));
Console.WriteLine("exit".ToUpperInvariant());
Console.WriteLine(3.5.ToString(tr));
