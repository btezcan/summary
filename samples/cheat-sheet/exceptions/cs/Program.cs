try
{
    int n = int.Parse("abc");
}
catch (FormatException e)
{
    Console.WriteLine(e.GetType().Name);
}
finally
{
    Console.WriteLine("done");
}

if (int.TryParse("42", out int value))
    Console.WriteLine(value);

try
{
    throw new ArgumentException("negative");
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}
