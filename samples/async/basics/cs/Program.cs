int length = await Download("page");
Console.WriteLine(length);

static async Task<int> Download(string name)
{
    Console.WriteLine($"downloading {name}...");
    await Task.Delay(100);  // pretend I/O
    return name.Length;
}
