string? name = null;

Console.WriteLine(name?.Length);  // (empty)
Console.WriteLine(name ?? "unknown");
Console.WriteLine(name?.Length ?? 0);

if (name is not null)
    Console.WriteLine(name.Length);

name ??= "Ali";
Console.WriteLine(name);
