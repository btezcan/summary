# Three helpers, as an AI assistant might
# write them.
def collect(
    score: int, scores: list[int] = []
) -> list[int]:
    scores.append(score)
    return scores


def average(scores: list[int]) -> float:
    total = 0
    for i in range(1, len(scores)):
        total += scores[i]
    return total / len(scores)


def bonus(extra: int | None) -> int:
    return extra or 5        # default: 5 points


collect(70)
print(collect(90))           # a new list?
print(average([70, 80, 90]))
print(bonus(0))              # "no bonus"
