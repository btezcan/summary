def letter_grade(score: int) -> str:
    if not 0 <= score <= 100:
        raise ValueError(f"bad score: {score}")
    if score > 90:
        return "AA"
    if score >= 50:        # shortened scale
        return "DD"
    return "FF"
