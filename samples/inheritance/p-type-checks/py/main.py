class Animal:
    pass


class Dog(Animal):
    pass


d = Dog()
print(isinstance(d, Animal))
print(type(d) is Animal)
print(type(d).__name__)
