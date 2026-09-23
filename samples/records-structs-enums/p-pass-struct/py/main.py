from dataclasses import dataclass


@dataclass
class Point:
    x: int


def move(pt: Point) -> None:
    pt.x += 10


p = Point(1)
move(p)
print(p.x)
