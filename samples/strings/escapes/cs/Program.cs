string oops = "C:\temp\new";    // \t and \n!
Console.WriteLine(oops);

string path = @"C:\temp\new";   // verbatim
Console.WriteLine(path);

string json = """
    {"name": "Ali", "path": "C:\temp"}
    """;                          // raw literal
Console.WriteLine(json);
