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
from collections import defaultdict
from statistics import mean

groups: dict[str, list[int]] = defaultdict(list)
for s in students:
    groups[s.dept].append(s.score)

for dept, scores in groups.items():
    print(f"{dept}: {len(scores)}, "
          f"avg {mean(scores):.1f}")
# endregion
