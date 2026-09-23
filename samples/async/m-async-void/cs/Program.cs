try
{
    Fail();      // async void: no await
}
catch (InvalidOperationException)
{
    Console.WriteLine("caught");   // never runs
}
await Task.Delay(200);
Console.WriteLine("end");

static async void Fail()
{
    await Task.Delay(50);
    throw new InvalidOperationException("boom");
}
