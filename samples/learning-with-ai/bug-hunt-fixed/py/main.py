def collect(
    score: int, scores: list[int] | None = None
) -> list[int]:
    if scores is None:                  # bug 1
        scores = []
    scores.append(score)
    return scores


def average(scores: list[int]) -> float:
    return sum(scores) / len(scores)    # bug 2


def bonus(extra: int | None) -> int:
    # bug 3: only None means "not given"
    return 5 if extra is None else extra


collect(70)
print(collect(90))
print(average([70, 80, 90]))
print(bonus(0))
