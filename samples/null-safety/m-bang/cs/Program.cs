// "!" tells the compiler: trust me, not null
string nick = FindNickname("Can")!;
Console.WriteLine(nick.Length);

static string? FindNickname(string name) =>
    name == "Ali" ? "Aliko" : null;
