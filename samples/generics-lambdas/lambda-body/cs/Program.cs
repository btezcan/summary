// A statement lambda: several lines in braces
Func<int, string> grade = score =>
{
    if (score >= 90) return "AA";
    if (score >= 50) return "pass";
    return "FF";
};

Console.WriteLine(grade(95));
Console.WriteLine(grade(60));
