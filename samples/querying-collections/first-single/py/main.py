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
top = next(s for s in students if s.score > 90)
print(top.name)

none = next(
    (s for s in students if s.score > 100),
    None)
print(none is None)

(me,) = [s for s in students if s.dept == "ME"]
print(me.name)
# endregion
