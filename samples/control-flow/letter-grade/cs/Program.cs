string LetterGrade(int score) => score switch
{
    < 0 or > 100 =>
        throw new ArgumentOutOfRangeException(
            nameof(score)),
    >= 90 => "AA",
    >= 85 => "BA",
    >= 80 => "BB",
    >= 75 => "CB",
    >= 70 => "CC",
    >= 60 => "DC",
    >= 50 => "DD",
    _ => "FF"
};

Console.WriteLine(LetterGrade(87));
Console.WriteLine(LetterGrade(50));
Console.WriteLine(LetterGrade(12));
