var nums = new List<int> { 1, 2, 2, 3 };
foreach (int n in nums)
{
    if (n == 2) nums.Remove(n);
}
Console.WriteLine(string.Join(", ", nums));
