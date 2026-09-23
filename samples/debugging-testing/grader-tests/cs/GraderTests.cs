using GradeApp;

public class GraderTests
{
    [Theory]
    [InlineData(95, "AA")]
    [InlineData(90, "AA")]     // boundary
    [InlineData(89, "DD")]     // boundary
    [InlineData(50, "DD")]     // boundary
    [InlineData(49, "FF")]     // boundary
    public void LetterGrade_ReturnsExpected(
        int score, string expected) =>
        Assert.Equal(expected,
            Grader.LetterGrade(score));

    [Fact]
    public void LetterGrade_RejectsNegative() =>
        Assert.Throws<ArgumentException>(
            () => Grader.LetterGrade(-1));
}
