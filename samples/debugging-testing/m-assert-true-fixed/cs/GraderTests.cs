using GradeApp;

public class GraderTests
{
    [Fact]
    public void Ninety_IsAA()
    {
        string grade = Grader.LetterGrade(90);
        Assert.Equal("AA", grade);
    }
}
