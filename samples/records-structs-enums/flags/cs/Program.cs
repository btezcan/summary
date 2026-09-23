var p = Permission.Read | Permission.Write;
Console.WriteLine(p);
Console.WriteLine(p.HasFlag(Permission.Write));
Console.WriteLine(p.HasFlag(Permission.Delete));

[Flags]
enum Permission
{
    None = 0, Read = 1, Write = 2, Delete = 4
}
