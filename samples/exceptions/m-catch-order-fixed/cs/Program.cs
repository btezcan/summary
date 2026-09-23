try
{
    int.Parse("x");
}
catch (FormatException)
{
    Console.WriteLine("not a number");
}
catch (Exception)
{
    Console.WriteLine("something failed");
}
