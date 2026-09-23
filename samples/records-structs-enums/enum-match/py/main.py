from enum import Enum, auto


class Status(Enum):
    DRAFT = auto()
    SUBMITTED = auto()
    GRADED = auto()


for s in Status:
    match s:
        case Status.DRAFT:
            print("keep writing")
        case Status.SUBMITTED:
            print("wait for a grade")
        case Status.GRADED:
            print("check your score")
