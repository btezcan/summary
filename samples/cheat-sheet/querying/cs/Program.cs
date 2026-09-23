int[] nums = [5, 2, 8, 1, 9, 4];

var result = nums
    .Where(n => n > 2)
    .Select(n => n * 10)
    .OrderBy(n => n)
    .ToList();
Console.WriteLine(string.Join(" ", result));

Console.WriteLine(nums.Sum());
Console.WriteLine(nums.Any(n => n > 8));
Console.WriteLine(nums.Count(n => n % 2 == 0));
Console.WriteLine(nums.OrderByDescending(n => n)
                      .First());
