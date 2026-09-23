for i in range(3):
    print(i, end="")           # 012
print()

names = ["Ali", "Can"]
for name in names:
    print(name)

for i, name in enumerate(names):
    print(f"{i}: {name}")

n = 0
while n < 3:
    n += 1
print(n)
