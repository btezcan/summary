class Student:
    def __init__(self, name: str,
                 year: int = 1):
        self.name = name
        self.year = year


s = Student(name="Ali", year=2)
print(f"{s.name}, year {s.year}")

t = Student(name="Can")
print(f"{t.name}, year {t.year}")
