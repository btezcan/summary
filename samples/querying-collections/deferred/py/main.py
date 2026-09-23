numbers = [1, 2, 3]
big = (n for n in numbers if n > 1)  # lazy
numbers.append(4)
print(sum(1 for _ in big))   # runs now
print(sum(1 for _ in big))   # already used up
