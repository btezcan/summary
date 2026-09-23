Console.Write("Age: ");
string? text = Console.ReadLine();
if (int.TryParse(text, out int age))
    Console.WriteLine(age + 1);
else
    Console.WriteLine("no valid age");
