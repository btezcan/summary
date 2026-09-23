object value = "hello";
Console.WriteLine(value is string);

string? text = value as string;
Console.WriteLine(text?.Length);

Console.WriteLine(value.GetType());
Console.WriteLine(typeof(string));

int count = 3;
Console.WriteLine(nameof(count));
