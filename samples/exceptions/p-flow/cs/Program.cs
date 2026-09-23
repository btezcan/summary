try
{
    Console.WriteLine("A");
    int.Parse("x");
    Console.WriteLine("B");
}
catch (FormatException)
{
    Console.WriteLine("C");
}
Console.WriteLine("D");
