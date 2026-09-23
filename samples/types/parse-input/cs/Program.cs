Console.Write("Age: ");
string? text = Console.ReadLine();
if (int.TryParse(text, out int age))
    Console.WriteLine($"Next year: {age + 1}");
else
    Console.WriteLine("Please enter a number.");
