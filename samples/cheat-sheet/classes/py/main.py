class Student:
    def __init__(self, name: str, grade: int):
        self.name = name
        self.grade = grade     # uses the setter

    @property
    def grade(self) -> int:
        return self._grade

    @grade.setter
    def grade(self, value: int) -> None:
        self._grade = max(0, min(value, 100))

    @property
    def passed(self) -> bool:
        return self.grade >= 50

    def __str__(self) -> str:
        return f"{self.name}: {self.grade}"


s = Student("Ali", 85)
s.grade = 120
print(s)
print(s.passed)
