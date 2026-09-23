using System.Globalization;

var tr = new CultureInfo("tr-TR");
var inv = CultureInfo.InvariantCulture;

// tr-TR: '.' groups thousands, ',' is decimal
double a = double.Parse("3,14", tr);
double b = double.Parse("3.14", tr);
double c = double.Parse("3.14", inv);

Console.WriteLine(a.ToString(inv));
Console.WriteLine(b.ToString(inv));
Console.WriteLine(c.ToString(inv));
Console.WriteLine(1234.5.ToString("N1", tr));
