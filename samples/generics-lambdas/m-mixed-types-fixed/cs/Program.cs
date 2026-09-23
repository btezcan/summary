Console.WriteLine(Max(3, int.Parse("5")));

static T Max<T>(T a, T b)
    where T : IComparable<T> =>
    a.CompareTo(b) >= 0 ? a : b;
