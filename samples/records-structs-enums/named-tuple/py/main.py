from typing import NamedTuple


class Point(NamedTuple):
    x: int
    y: int


p = Point(3, 4)
print(p)
print(p.x, p[1])      # by name or by index
x, y = p              # unpacks like a tuple
print(x + y)
