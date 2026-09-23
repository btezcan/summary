parts = []
for i in range(1, 6):
    parts.append(str(i))
print(", ".join(parts))

print(", ".join(str(i) for i in range(1, 6)))
