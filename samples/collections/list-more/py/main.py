names = ["Can", "Ali"]
names.insert(0, "Zeynep")
names.append("Ayşe")
print(names)

print("Ali" in names)
print(names.index("Ali"))
del names[0]
print(names)
print(names[0:2])      # slice: a new list
