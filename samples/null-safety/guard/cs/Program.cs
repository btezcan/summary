Console.WriteLine(Greet("Ali"));
try
{
    Greet(null!);
}
catch (ArgumentNullException e)
{
    Console.WriteLine(e.Message);
}

static string Greet(string name)
{
    ArgumentNullException.ThrowIfNull(name);
    return $"Hello, {name}!";
}
