from dataclasses import FrozenInstanceError
from dataclasses import dataclass


@dataclass(frozen=True)
class Course:
    code: str
    credits: int


course = Course("CS101", 4)
try:
    course.credits = 5
except FrozenInstanceError as e:
    print(f"{type(e).__name__}: {e}")
