int count = 3;                // fixed type
var price = 9.99m;            // decimal
string? note = null;          // may be null
const double Pi = 3.14159;
int n = int.Parse("42");
double avg = (double)7 / 2;   // 3.5
int q = 7 / 2, r = -7 % 3;    // 3, -1
Console.WriteLine($"{count} {price} {n}");
Console.WriteLine($"{avg} {q} {r} {Pi}");
Console.WriteLine(note is null);
