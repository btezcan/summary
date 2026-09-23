from dataclasses import dataclass


@dataclass
class Point:
    x: int
    y: int


p1 = Point(1, 2)
p2 = p1               # the same object
p2.x = 100
print(p1.x)
print(p2.x)
