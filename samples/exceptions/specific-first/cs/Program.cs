foreach (string text in new[] { "4", "x", "0" })
{
    try
    {
        Console.WriteLine(100 / int.Parse(text));
    }
    catch (FormatException)
    {
        Console.WriteLine($"'{text}' is not a number");
    }
    catch (DivideByZeroException)
    {
        Console.WriteLine("cannot divide by zero");
    }
}
