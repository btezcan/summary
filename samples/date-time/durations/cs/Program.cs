var start = new DateTime(2026, 9, 23, 9, 30, 0);
var end = new DateTime(2026, 9, 23, 11, 15, 0);

TimeSpan lesson = end - start;
Console.WriteLine(lesson);
Console.WriteLine(lesson.TotalMinutes);
Console.WriteLine(start.AddHours(2.5));
