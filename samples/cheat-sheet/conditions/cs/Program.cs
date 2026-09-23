int score = 72;
if (score >= 50 && score < 60)
    Console.WriteLine("barely");
else if (score >= 60)
    Console.WriteLine("pass");
else
    Console.WriteLine("fail");

string grade = score switch
{
    >= 90 => "AA",
    >= 70 => "CC",
    _ => "FF",
};
Console.WriteLine(grade);
