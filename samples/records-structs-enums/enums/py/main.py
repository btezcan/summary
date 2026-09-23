from enum import Enum


class Day(Enum):
    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3
    THURSDAY = 4
    FRIDAY = 5
    SATURDAY = 6
    SUNDAY = 7


def is_weekend(d: Day) -> bool:
    return d in (Day.SATURDAY, Day.SUNDAY)


print(is_weekend(Day.SUNDAY))
print(Day.WEDNESDAY.value)
print(Day.FRIDAY)
print(Day.FRIDAY.name)
