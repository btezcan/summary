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
by_score = sorted(
    students,
    key=lambda s: s.score,
    reverse=True)
passed = [s.name for s in by_score
          if s.score >= 60]
print(", ".join(passed))
# endregion
