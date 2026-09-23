using System.Diagnostics;

var sw = Stopwatch.StartNew();
await Download("A");                 // one after
await Download("B");                 // the other
Console.WriteLine(
    $"sequential ≥ 0.6 s: {sw.Elapsed.TotalSeconds >= 0.6}");

sw.Restart();
string[] both = await Task.WhenAll(
    Download("A"), Download("B"));  // together
Console.WriteLine(string.Join(", ", both));
Console.WriteLine(
    $"concurrent < 0.5 s: {sw.Elapsed.TotalSeconds < 0.5}");

static async Task<string> Download(string name)
{
    await Task.Delay(300);
    return $"{name} downloaded";
}
