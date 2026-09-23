try
{
    Loader.Load("abc");
}
catch (FormatException e)
{
    Console.WriteLine(e.Message);
    // Our own frames, without file paths:
    foreach (string line in e.StackTrace!.Split('\n'))
        if (line.Contains("Loader."))
            Console.WriteLine(line.Split(" in ")[0]);
}

static class Loader
{
    public static int Load(string text) =>
        ParseAge(text);

    static int ParseAge(string text) =>
        int.Parse(text);
}
