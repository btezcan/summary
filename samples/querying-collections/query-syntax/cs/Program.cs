int[] scores = { 85, 92, 58, 74, 66 };

// Query syntax: becomes Where, OrderBy, Select
var passed =
    from s in scores
    where s >= 60
    orderby s descending
    select s;
Console.WriteLine(string.Join(", ", passed));
