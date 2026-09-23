from dataclasses import dataclass


@dataclass
class Student:
    name: str
    advisor: "Student | None"


ali = Student("Ali", None)
demir = Student("Prof. Demir", None)
can = Student("Can", demir)

for s in [ali, can]:
    advisor = s.advisor
    print(advisor.name if advisor
          else "no advisor")
