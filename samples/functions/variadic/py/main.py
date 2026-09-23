def average(*numbers: int) -> float:
    if not numbers:
        return 0.0
    return sum(numbers) / len(numbers)


print(average(70, 80, 95))
print(f"{average(70, 80, 95):.2f}")
print(average())
