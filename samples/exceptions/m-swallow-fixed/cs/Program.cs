int total = 0;
string[] inputs = { "10", "2O", "5" };  // 2O!
foreach (string text in inputs)
{
    if (int.TryParse(text, out int n))
        total += n;
    else
        Console.WriteLine($"skipped '{text}'");
}
Console.WriteLine(total);
