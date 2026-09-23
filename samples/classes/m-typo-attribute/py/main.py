class Student:
    def __init__(self, name: str):
        self.name = name


s = Student("Ali")
s.nmae = "Can"       # typo: a new attribute!
print(s.name)
