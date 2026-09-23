using System.Globalization;

// What a Turkish-locale computer does:
CultureInfo.CurrentCulture = new("tr-TR");

var inv = CultureInfo.InvariantCulture;
double price = double.Parse("3.14", inv);
Console.WriteLine((price * 2).ToString(inv));
