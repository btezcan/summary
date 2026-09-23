class Student:
    __slots__ = ("name",)   # only these

    def __init__(self, name: str):
        self.name = name


s = Student("Ali")
s.name = "Can"
print(s.name)
