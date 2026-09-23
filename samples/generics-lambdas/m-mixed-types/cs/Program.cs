Console.WriteLine(Max(3, "x"));

static T Max<T>(T a, T b)
    where T : IComparable<T> =>
    a.CompareTo(b) >= 0 ? a : b;
