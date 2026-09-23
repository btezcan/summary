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
# dict.fromkeys keeps the first-seen order
depts = dict.fromkeys(s.dept for s in students)
print(", ".join(depts))

names = [s.name for s in students]
print(", ".join(names[:2]))
print(", ".join(names[3:]))
# endregion
