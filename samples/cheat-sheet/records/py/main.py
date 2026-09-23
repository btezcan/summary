from dataclasses import dataclass, replace
from enum import Enum


@dataclass(frozen=True)
class Point:
    x: int
    y: int


class Day(Enum):
    MON = 1
    TUE = 2
    WED = 3


a = Point(1, 2)
b = replace(a, y=5)
print(a)
print(b)
print(a == Point(1, 2))

day = Day.TUE
print(f"{day.name} {day.value}")
