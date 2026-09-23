Console.WriteLine(IsWeekend(Day.Sunday));
Console.WriteLine((int)Day.Wednesday);
Console.WriteLine(Day.Friday);

static bool IsWeekend(Day d) =>
    d is Day.Saturday or Day.Sunday;

enum Day
{
    Monday, Tuesday, Wednesday, Thursday,
    Friday, Saturday, Sunday
}
