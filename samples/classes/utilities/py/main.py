PASS_MARK = 50


# A plain function in a module is enough
def is_passing(score: int) -> bool:
    return score >= PASS_MARK


print(is_passing(72))
print(is_passing(41))
