var results = await Task.WhenAll(
    Fetch("a", 200), Fetch("b", 100));
Console.WriteLine(string.Join(" ", results));

static async Task<string> Fetch(string name,
                                int ms)
{
    await Task.Delay(ms);    // "I/O"
    return name.ToUpper();
}
