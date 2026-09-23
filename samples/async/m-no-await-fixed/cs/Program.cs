Console.WriteLine("start");
await SaveAsync();
Console.WriteLine("end");

static async Task SaveAsync()
{
    await Task.Delay(100);
    Console.WriteLine("saved");
}
