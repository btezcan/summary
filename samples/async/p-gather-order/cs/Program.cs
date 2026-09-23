string[] results = await Task.WhenAll(
    Job("slow", 300), Job("fast", 50));
Console.WriteLine(string.Join(", ", results));

static async Task<string> Job(
    string name, int ms)
{
    await Task.Delay(ms);
    Console.WriteLine($"{name} finished");
    return name;
}
