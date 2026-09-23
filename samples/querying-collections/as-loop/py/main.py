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
names = []
for s in students:
    if s.score >= 60:
        names.append(s.name)
print(", ".join(names))
# endregion
