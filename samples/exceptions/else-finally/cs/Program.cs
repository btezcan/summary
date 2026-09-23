foreach (string text in new[] { "7", "x" })
{
    Console.WriteLine(text);
    try
    {
        int n = int.Parse(text);
        Console.WriteLine($"  parsed {n}");
    }
    catch (FormatException)
    {
        Console.WriteLine("  bad input");
    }
    finally
    {
        Console.WriteLine("  done");
    }
}
