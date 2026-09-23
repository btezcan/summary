csv = "Ali;85;Computer Eng."
parts = csv.split(";")

print(len(parts))
print(parts[0])
print(" | ".join(parts))
