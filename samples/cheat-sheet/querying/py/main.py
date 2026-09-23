nums = [5, 2, 8, 1, 9, 4]

result = sorted(n * 10 for n in nums if n > 2)
print(*result)

print(sum(nums))
print(any(n > 8 for n in nums))
print(sum(1 for n in nums if n % 2 == 0))
print(max(nums))
