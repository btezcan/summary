using System.Globalization;

// What a Turkish-locale computer does:
CultureInfo.CurrentCulture = new("tr-TR");

double price = double.Parse("3.14");
Console.WriteLine(price * 2);
