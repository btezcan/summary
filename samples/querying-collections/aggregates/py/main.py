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
from statistics import mean

scores = [s.score for s in students]
print(len(students))
print(sum(scores))
print(mean(scores))
print(max(scores))
print(any(s.score < 50 for s in students))
print(all(s.score > 50 for s in students))
# endregion
