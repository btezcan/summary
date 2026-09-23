from dataclasses import dataclass


class PlainCourse:
    def __init__(self, code: str):
        self.code = code


@dataclass
class DataCourse:
    code: str


a = PlainCourse("CS101")
b = PlainCourse("CS101")
print(a == b)                # class: identity

x = DataCourse("CS101")
y = DataCourse("CS101")
print(x == y)                # dataclass: value
