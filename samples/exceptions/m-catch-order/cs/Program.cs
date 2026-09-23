try
{
    int.Parse("x");
}
catch (Exception)
{
    Console.WriteLine("something failed");
}
catch (FormatException)
{
    Console.WriteLine("not a number");
}
