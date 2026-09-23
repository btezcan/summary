var birth = new DateOnly(2006, 3, 15);
var today = new DateOnly(2026, 9, 23);

int age = today.Year - birth.Year;
if (today < birth.AddYears(age)) age--;
Console.WriteLine(age);

int days = today.DayNumber - birth.DayNumber;
Console.WriteLine(days);
Console.WriteLine(today.AddDays(30));
Console.WriteLine(today.DayOfWeek);
Console.WriteLine($"{today:yyyy-MM-dd}");
