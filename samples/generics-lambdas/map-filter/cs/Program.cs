int[] nums = { 1, 2, 3, 4, 5, 6 };

var squares = nums
    .Where(n => n % 2 == 0)
    .Select(n => n * n);
Console.WriteLine(string.Join(", ", squares));
