int total = 0;
string[] inputs = { "10", "2O", "5" };  // 2O!
foreach (string text in inputs)
{
    try
    {
        total += int.Parse(text);
    }
    catch
    {
    }
}
Console.WriteLine(total);
