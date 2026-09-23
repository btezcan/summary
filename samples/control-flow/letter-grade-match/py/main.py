def letter_grade(score: int) -> str:
    match score:
        case s if s < 0 or s > 100:
            raise ValueError(f"bad score: {s}")
        case s if s >= 90:
            return "AA"
        case s if s >= 85:
            return "BA"
        case s if s >= 80:
            return "BB"
        case s if s >= 75:
            return "CB"
        case s if s >= 70:
            return "CC"
        case s if s >= 60:
            return "DC"
        case s if s >= 50:
            return "DD"
        case _:
            return "FF"


print(letter_grade(87))
