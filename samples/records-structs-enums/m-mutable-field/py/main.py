from dataclasses import dataclass

try:
    @dataclass
    class Student:
        name: str
        grades: list[int] = []
except ValueError as e:
    print(e)
