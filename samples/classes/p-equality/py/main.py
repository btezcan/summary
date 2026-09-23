class Point:
    def __init__(self, x: int, y: int):
        self.x, self.y = x, y


a = Point(1, 2)
b = Point(1, 2)
c = a
print(a == b)
print(a == c)
