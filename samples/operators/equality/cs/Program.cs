string a = "hello";
string b = string.Concat("hel", "lo");
Console.WriteLine(a == b);   // content
Console.WriteLine(
    ReferenceEquals(a, b));  // same object?
