object[] values = { 42, "hi", 3.5, 7 };
foreach (object v in values)
{
    string text = v switch
    {
        int n when n > 40 => $"big int {n}",
        int n => $"int {n}",
        string s => $"text '{s}'",
        _ => "something else"
    };
    Console.WriteLine(text);
}
