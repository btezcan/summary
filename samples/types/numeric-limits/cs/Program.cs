// Sizes (bytes) and ranges, printed by .NET itself.
void Row(string type, int size, object min, object max) =>
    Console.WriteLine($"{type,-8}{size,3}  {min} … {max}");

Row("bool", sizeof(bool), false, true);
Row("byte", sizeof(byte), byte.MinValue, byte.MaxValue);
Row("sbyte", sizeof(sbyte), sbyte.MinValue, sbyte.MaxValue);
Row("short", sizeof(short), short.MinValue, short.MaxValue);
Row("ushort", sizeof(ushort), ushort.MinValue, ushort.MaxValue);
Row("int", sizeof(int), int.MinValue, int.MaxValue);
Row("uint", sizeof(uint), uint.MinValue, uint.MaxValue);
Row("long", sizeof(long), long.MinValue, long.MaxValue);
Row("ulong", sizeof(ulong), ulong.MinValue, ulong.MaxValue);
Row("float", sizeof(float), float.MinValue, float.MaxValue);
Row("double", sizeof(double), double.MinValue, double.MaxValue);
Row("decimal", sizeof(decimal), decimal.MinValue, decimal.MaxValue);
Row("char", sizeof(char), (int)char.MinValue, (int)char.MaxValue);
