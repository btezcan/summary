Console.WriteLine(Grades.IsPassing(72));
Console.WriteLine(Grades.IsPassing(41));

// A static class: no objects, only members
static class Grades
{
    public const int PassMark = 50;

    public static bool IsPassing(int score) =>
        score >= PassMark;
}
