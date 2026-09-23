namespace GradeApp;

public static class Grader
{
    public static string LetterGrade(int score)
    {
        if (score is < 0 or > 100)
            throw new ArgumentException(
                $"bad score: {score}");
        return score switch
        {
            >= 90 => "AA",
            >= 50 => "DD",   // shortened scale
            _ => "FF",
        };
    }
}
