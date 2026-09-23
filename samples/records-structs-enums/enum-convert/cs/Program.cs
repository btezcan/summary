if (Enum.TryParse("Sunday", out Day d))
    Console.WriteLine((int)d);

Day odd = (Day)42;            // allowed!
Console.WriteLine(odd);
Console.WriteLine(Enum.IsDefined(odd));

enum Day
{
    Monday, Tuesday, Wednesday, Thursday,
    Friday, Saturday, Sunday
}
