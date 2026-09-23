from enum import Enum


class Day(Enum):
    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3
    THURSDAY = 4
    FRIDAY = 5
    SATURDAY = 6
    SUNDAY = 7


print(Day["SUNDAY"].value)    # by name
print(Day(7))                 # by value
try:
    Day(42)
except ValueError as e:
    print(e)
