# region data
from dataclasses import dataclass


@dataclass(frozen=True)
class Student:
    name: str
    dept: str
    score: int


students = [
    Student("Ayşe", "CS", 85),
    Student("Mehmet", "EE", 92),
    Student("Can", "CS", 58),
    Student("Zeynep", "ME", 74),
    Student("Emre", "EE", 66),
]
# endregion

# region query
by_name = {s.name: s.score for s in students}
print(by_name["Can"])

depts = {s.dept for s in students}
print("EE" in depts)
# endregion
