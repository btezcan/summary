Console.WriteLine(Check());

static string Check()
{
    try
    {
        return "from try";
    }
    finally
    {
        Console.WriteLine("finally");
    }
}
