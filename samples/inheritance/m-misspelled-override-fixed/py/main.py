from typing import override


class Animal:
    def speak(self) -> str:
        return "..."


class Dog(Animal):
    @override          # mypy checks this
    def speak(self) -> str:
        return "Woof"


print(Dog().speak())
