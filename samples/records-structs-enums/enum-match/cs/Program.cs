foreach (var s in new[] { Status.Draft,
    Status.Submitted, Status.Graded })
{
    Console.WriteLine(s switch
    {
        Status.Draft => "keep writing",
        Status.Submitted => "wait for a grade",
        Status.Graded => "check your score",
        _ => "unknown"
    });
}

enum Status { Draft, Submitted, Graded }
