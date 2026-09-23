from dataclasses import dataclass, field


@dataclass
class Student:
    name: str
    grades: list[int] = field(
        default_factory=list)  # new list each


print(Student("Ali"))
