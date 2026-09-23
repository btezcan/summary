import os.path

# Older style: %-formatting and os.path
name = "Ali"
count = 1
print("%s has %d items" % (name, count))
path = os.path.join("data", "grades.csv")
print(os.path.splitext(path)[1])
