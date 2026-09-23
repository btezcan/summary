int? age = null;
Console.WriteLine(age.HasValue);
Console.WriteLine(age ?? 0);

age = 20;
Console.WriteLine(age.HasValue);
Console.WriteLine(age + 1);
