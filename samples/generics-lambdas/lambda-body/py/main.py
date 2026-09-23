# A lambda is one expression; use def for more
def grade(score: int) -> str:
    if score >= 90:
        return "AA"
    if score >= 50:
        return "pass"
    return "FF"


print(grade(95))
print(grade(60))
