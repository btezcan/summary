try
{
    LoadPort("port=abc");
}
catch (InvalidOperationException e)
{
    Console.WriteLine(e.Message);
    Console.WriteLine(
        e.InnerException?.GetType().Name);
}

static int LoadPort(string line)
{
    try
    {
        return int.Parse(line.Split('=')[1]);
    }
    catch (FormatException e)
    {
        throw new InvalidOperationException(
            "Bad config line", e);
    }
}
