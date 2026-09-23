from dataclasses import dataclass


@dataclass(frozen=True)
class Course:
    code: str
    credits: int


courses = {
    Course("CS101", 4),
    Course("CS101", 4),
    Course("CS102", 3),
}
print(len(courses))
