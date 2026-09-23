// #region data
var students = new List<Student>
{
    new("Ayşe", "CS", 85),
    new("Mehmet", "EE", 92),
    new("Can", "CS", 58),
    new("Zeynep", "ME", 74),
    new("Emre", "EE", 66),
};
// #endregion

// #region query
int calls = 0;
var scores = students.Select(s =>
{
    calls++;                  // count the work
    return s.Score;
});
Console.WriteLine(scores.Sum());
Console.WriteLine(scores.Max());
Console.WriteLine($"{calls} calls");
// #endregion

// #region type
record Student(string Name, string Dept,
    int Score);
// #endregion
