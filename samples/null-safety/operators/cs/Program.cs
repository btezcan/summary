string? nickname = null;
Console.WriteLine(nickname?.Length ?? 0);

nickname ??= "guest";
Console.WriteLine(nickname);
Console.WriteLine(nickname?.Length ?? 0);
