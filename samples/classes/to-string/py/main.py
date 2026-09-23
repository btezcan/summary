class Point:
    def __init__(self, x: int, y: int):
        self.x, self.y = x, y

    def __str__(self) -> str:      # for users
        return f"({self.x}, {self.y})"

    def __repr__(self) -> str:     # for devs
        return f"Point({self.x}, {self.y})"


p = Point(3, 4)
print(p)
print(f"Point is {p}")
print([p])        # lists show the repr
