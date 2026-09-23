Console.WriteLine(Max(3, 7));
Console.WriteLine(Max("apple", "pear"));
Console.WriteLine(Max(2.5, 1.5));

// T must be comparable with itself
static T Max<T>(T a, T b)
    where T : IComparable<T> =>
    a.CompareTo(b) >= 0 ? a : b;
