import math


# No overloading: use different names
def circle_area(radius: float) -> float:
    return math.pi * radius ** 2


def rectangle_area(w: float, h: float) -> float:
    return w * h


print(f"{circle_area(1):.2f}")
print(rectangle_area(2, 3))
