foreach (string name in new[] { "Ali", "Can" })
{
    string? nick = FindNickname(name);
    if (nick is null)
        Console.WriteLine($"{name}: no nickname");
    else
        Console.WriteLine($"{name}: {nick.ToUpper()}");
}

static string? FindNickname(string name) =>
    name == "Ali" ? "Aliko" : null;
