using (new Resource("export"))
{
    Console.WriteLine("working");
}

try
{
    using var r = new Resource("import");
    throw new InvalidDataException("bad data");
}
catch (InvalidDataException e)
{
    Console.WriteLine($"error: {e.Message}");
}

class Resource : IDisposable
{
    private readonly string _name;

    public Resource(string name)
    {
        _name = name;
        Console.WriteLine($"{name}: open");
    }

    public void Dispose() =>
        Console.WriteLine($"{_name}: closed");
}
