GRADES = [(90, "AA"), (85, "BA"), (80, "BB"),
          (75, "CB"), (70, "CC"), (60, "DC"),
          (50, "DD")]


def letter_grade(score: int) -> str:
    if not 0 <= score <= 100:
        raise ValueError(f"bad score: {score}")
    for limit, grade in GRADES:
        if score >= limit:
            return grade
    return "FF"


print(letter_grade(87))
print(letter_grade(50))
print(letter_grade(12))
