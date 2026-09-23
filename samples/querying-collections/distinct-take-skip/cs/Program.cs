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
var depts = students.Select(s => s.Dept)
    .Distinct();
Console.WriteLine(string.Join(", ", depts));

var names = students.Select(s => s.Name);
Console.WriteLine(
    string.Join(", ", names.Take(2)));
Console.WriteLine(
    string.Join(", ", names.Skip(3)));
// #endregion

// #region type
record Student(string Name, string Dept,
    int Score);
// #endregion
