from dataclasses import dataclass, replace


@dataclass(frozen=True)
class Course:
    code: str
    title: str
    credits: int


c1 = Course("CS101", "Intro", 4)
c2 = Course("CS101", "Intro", 4)
print(c1 == c2)
print(c1)

c3 = replace(c1, credits=5)
print(c3.credits)
print(c1.credits)
