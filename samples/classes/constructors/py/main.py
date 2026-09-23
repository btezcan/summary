class Rectangle:
    def __init__(self, w: float, h: float):
        self.width = w
        self.height = h

    # An alternative constructor
    @classmethod
    def square(cls, side: float) -> "Rectangle":
        return cls(side, side)

    @property
    def area(self) -> float:
        return self.width * self.height


r = Rectangle(2, 3)
s = Rectangle.square(4)
print(r.area)
print(s.area)
