def min_max(vals: list[int]) -> tuple[int, int]:
    return min(vals), max(vals)


lo, hi = min_max([4, 9, 1, 7])
print(f"{lo} - {hi}")
