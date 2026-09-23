nums = [1, 2, 3, 4, 5, 6]

evens = filter(lambda n: n % 2 == 0, nums)
squares = map(lambda n: n * n, evens)
print(list(squares))

print([n * n for n in nums if n % 2 == 0])
