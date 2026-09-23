using var http = new HttpClient();
string html = await http.GetStringAsync(
    "https://example.com/");
Console.WriteLine($"{html.Length} characters");
