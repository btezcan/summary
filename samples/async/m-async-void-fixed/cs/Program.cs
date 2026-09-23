try
{
    await Fail();
}
catch (InvalidOperationException)
{
    Console.WriteLine("caught");
}
Console.WriteLine("end");

static async Task Fail()
{
    await Task.Delay(50);
    throw new InvalidOperationException("boom");
}
