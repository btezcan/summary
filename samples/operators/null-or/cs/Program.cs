string? name = null;
Console.WriteLine(name ?? "guest");

name = "";
Console.WriteLine($"[{name ?? "guest"}]");

int? count = 0;
Console.WriteLine(count ?? 10);
