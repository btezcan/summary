def average(values: list[int]) -> float:
    total = 0
    for i in range(1, len(values)):
        total += values[i]
        print(f"i={i}, total={total}")
    return total / len(values)


print(average([70, 80, 90]))   # 80?
