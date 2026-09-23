using System.Globalization;

// What a Turkish-locale computer does:
CultureInfo.CurrentCulture = new("tr-TR");

string input = "exit";
if (input.ToUpper() == "EXIT")
    Console.WriteLine("Bye!");
else
    Console.WriteLine(input.ToUpper());
