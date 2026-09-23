class Student:
    _next_id = 1

    def __init__(self, name: str):
        self.id = self._next_id
        self._next_id += 1   # on the object!
        self.name = name


a = Student("Ali")
b = Student("Ayşe")
print(a.id, b.id)
