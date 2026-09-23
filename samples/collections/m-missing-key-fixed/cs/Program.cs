var ages = new Dictionary<string, int>
{
    ["Ali"] = 20,
};
Console.WriteLine(
    ages.TryGetValue("Zeynep", out int age)
        ? age.ToString() : "unknown");
