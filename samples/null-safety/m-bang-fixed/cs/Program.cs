string? nick = FindNickname("Can");
Console.WriteLine(nick?.Length ?? 0);

static string? FindNickname(string name) =>
    name == "Ali" ? "Aliko" : null;
