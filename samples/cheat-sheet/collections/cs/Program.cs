List<int> nums = [3, 1, 2];
nums.Add(4);
nums.Sort();
Console.WriteLine(string.Join(" ", nums));
Console.WriteLine($"{nums[0]} {nums[^1]}");
Console.WriteLine(nums.Count);

var ages = new Dictionary<string, int>
{
    ["Ali"] = 20,
};
ages["Can"] = 21;
int ece = ages.GetValueOrDefault("Ece", -1);
Console.WriteLine(ece);
foreach (var (name, age) in ages)
    Console.WriteLine($"{name}={age}");

var seen = new HashSet<int> { 1, 2, 2 };
Console.WriteLine(seen.Count);
