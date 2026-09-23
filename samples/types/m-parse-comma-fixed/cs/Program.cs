using System.Globalization;

// "12,5" is written the Turkish way.
var tr = new CultureInfo("tr-TR");
decimal value = decimal.Parse("12,5", tr);

var inv = CultureInfo.InvariantCulture;
Console.WriteLine(value.ToString(inv));
