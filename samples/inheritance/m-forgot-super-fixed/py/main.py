class Animal:
    def __init__(self, name: str):
        self.name = name


class Dog(Animal):
    def __init__(self, name: str):
        super().__init__(name)
        self.tricks: list[str] = []


d = Dog("Rex")
print(d.name)
