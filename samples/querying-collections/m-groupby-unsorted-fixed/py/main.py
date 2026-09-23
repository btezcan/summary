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
from itertools import groupby

def by_dept(s: Student) -> str:
    return s.dept


ordered = sorted(students, key=by_dept)
for dept, group in groupby(ordered, by_dept):
    print(dept, [s.name for s in group])
# endregion
