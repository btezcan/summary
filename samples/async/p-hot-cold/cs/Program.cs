Task task = Work("A");        // created here
Console.WriteLine("created");
await task;

static async Task Work(string name)
{
    Console.WriteLine($"{name} started");
    await Task.Delay(50);
    Console.WriteLine($"{name} done");
}
