var mine = Permission.Read | Permission.Write;

Console.WriteLine(mine);
Console.WriteLine(mine.HasFlag(Permission.Write));
Console.WriteLine((mine & Permission.Execute) != 0);
Console.WriteLine((int)mine);

mine &= ~Permission.Write;       // remove a flag
Console.WriteLine(mine);

[Flags]
enum Permission
{
    None = 0,
    Read = 1,        // 0b001
    Write = 2,       // 0b010
    Execute = 4,     // 0b100
}
