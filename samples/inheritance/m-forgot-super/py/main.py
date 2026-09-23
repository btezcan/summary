class Animal:
    def __init__(self, name: str):
        self.name = name


class Dog(Animal):
    def __init__(self, name: str):
        self.tricks: list[str] = []


d = Dog("Rex")
print(d.name)
