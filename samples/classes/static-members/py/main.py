class Student:
    _next_id = 1                 # shared

    def __init__(self, name: str):
        self.id = Student._next_id
        Student._next_id += 1
        self.name = name

    @classmethod
    def count(cls) -> int:
        return cls._next_id - 1


a = Student("Ali")
b = Student("Ayşe")
print(a.id, b.id)
print(Student.count())
