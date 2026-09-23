from enum import Enum


class Day(Enum):
    MONDAY = 1
    TUESDAY = 2


today = Day.MONDAY
if today == Day.MONDAY:
    print("start of the week")
else:
    print("some other day")
