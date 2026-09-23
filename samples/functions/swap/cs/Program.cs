int x = 1, y = 2;
Swap(ref x, ref y);
Console.WriteLine($"{x}, {y}");

// ref: the method works on the caller's
// variables, not on copies
static void Swap(ref int a, ref int b) =>
    (a, b) = (b, a);
