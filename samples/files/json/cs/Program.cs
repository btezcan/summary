using System.Text.Encodings.Web;
using System.Text.Json;

var course = new Course("CS101", "Giriş", 4);
string json = JsonSerializer.Serialize(course);
Console.WriteLine(json);

var back = JsonSerializer.Deserialize<Course>(json);
Console.WriteLine(back == course);

var readable = new JsonSerializerOptions
{
    Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
};
Console.WriteLine(
    JsonSerializer.Serialize(course, readable));

record Course(string Code, string Title, int Credits);
