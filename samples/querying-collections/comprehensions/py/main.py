scores = [85, 92, 58, 74, 66]

passed = [s for s in scores if s >= 60]  # list
unique = {s // 10 for s in scores}       # set
labels = {s: s >= 60 for s in scores}    # dict
lazy = (s * 2 for s in scores)   # generator

print(passed)
print(sorted(unique))
print(labels[58])
print(next(lazy))
