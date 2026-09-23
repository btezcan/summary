def area(radius: float) -> float:
    return 3.14159 * radius ** 2


# This replaces the first area!
def area(w: float, h: float) -> float:
    return w * h


print(area(2, 3))
print(area(1))
