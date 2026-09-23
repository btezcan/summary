var ages = new Dictionary<string, int>
{
    ["Ali"] = 20,
};

// LBYL: look before you leap (idiomatic C#)
foreach (string name in new[] { "Ali", "Can" })
{
    if (ages.TryGetValue(name, out int age))
        Console.WriteLine($"{name}: {age}");
    else
        Console.WriteLine($"{name}: unknown");
}
