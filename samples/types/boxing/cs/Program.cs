int n = 42;
object boxed = n;       // boxing: a heap copy
int back = (int)boxed;  // unboxing: copy back
Console.WriteLine(back);

n = 7;                  // the box is separate
Console.WriteLine(boxed);
