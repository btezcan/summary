for i in range(3):
    print(i, end=" ")
print()

names = ["Ali", "Ayşe", "Can"]
for name in names:
    print(name, end=" ")
print()

for i, name in enumerate(names):
    print(f"{i}:{name}", end=" ")
print()
