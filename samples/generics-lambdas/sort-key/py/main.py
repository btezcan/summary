names = ["Zeynep", "Ali", "Can", "Ayşe"]

names.sort(key=len)
print(" ".join(names))

by_last = sorted(names, key=lambda n: n[-1])
print(" ".join(by_last))
