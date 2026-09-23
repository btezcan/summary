Console.WriteLine(Greeting("Ali"));
Console.WriteLine(Greeting("Ali", "Hi"));
Console.WriteLine(Greeting("Ali", shout: true));

static string Greeting(
    string name,
    string word = "Hello",
    bool shout = false)
{
    string text = $"{word}, {name}!";
    return shout ? text.ToUpper() : text;
}
