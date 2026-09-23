int number;
do
{
    Console.Write("Number (1-10): ");
} while (!int.TryParse(Console.ReadLine(),
             out number)
         || number < 1 || number > 10);

Console.WriteLine($"Thanks: {number}");
