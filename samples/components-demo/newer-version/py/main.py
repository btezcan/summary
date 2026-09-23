# Python 3.13: copy.replace works on
# dataclasses and many other types.
import copy
from dataclasses import dataclass


@dataclass(frozen=True)
class Point:
    x: int
    y: int


print(copy.replace(Point(1, 2), y=5))
