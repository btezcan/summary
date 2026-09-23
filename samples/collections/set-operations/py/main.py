cs = {"Ali", "Ayşe", "Can"}
py = {"Can", "Deniz"}

print(sorted(cs & py))     # in both
print(sorted(cs | py))     # in either
print(sorted(cs - py))     # only in cs
