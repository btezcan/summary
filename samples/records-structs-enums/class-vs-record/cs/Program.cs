var a = new PlainCourse("CS101");
var b = new PlainCourse("CS101");
Console.WriteLine(a == b);   // class: reference

var x = new RecordCourse("CS101");
var y = new RecordCourse("CS101");
Console.WriteLine(x == y);   // record: value

class PlainCourse(string code)
{
    public string Code { get; } = code;
}

record RecordCourse(string Code);
