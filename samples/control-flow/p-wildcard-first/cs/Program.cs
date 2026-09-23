int n = 5;
string size = n switch
{
    _ => "other",
    < 10 => "small",
};
Console.WriteLine(size);
