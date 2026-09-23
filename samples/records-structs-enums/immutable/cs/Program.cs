var course = new Course("CS101", 4);
course.Credits = 5;
Console.WriteLine(course);

record Course(string Code, int Credits);
