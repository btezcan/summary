var nums = new List<int> { 1, 5, 8, 12, 3 };
var big = Keep(nums, n => n > 4);
var even = Keep(nums, n => n % 2 == 0);
Console.WriteLine(string.Join(", ", big));
Console.WriteLine(string.Join(", ", even));

static List<int> Keep(List<int> items,
    Func<int, bool> rule)
{
    var result = new List<int>();
    foreach (int item in items)
        if (rule(item)) result.Add(item);
    return result;
}
