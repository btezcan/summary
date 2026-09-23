var set = new HashSet<Course>
{
    new("CS101", 4),
    new("CS101", 4),
    new("CS102", 3),
};
Console.WriteLine(set.Count);

record Course(string Code, int Credits);
