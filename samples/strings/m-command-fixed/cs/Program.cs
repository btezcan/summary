using System.Globalization;

// What a Turkish-locale computer does:
CultureInfo.CurrentCulture = new("tr-TR");

string input = "exit";
if (string.Equals(input, "EXIT",
        StringComparison.OrdinalIgnoreCase))
    Console.WriteLine("Bye!");
else
    Console.WriteLine(input.ToUpper());
