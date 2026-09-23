import sys

# CPython counts references to each object.
# (getrefcount's own argument adds one.)
data = [1, 2, 3]
print(sys.getrefcount(data))
alias = data
print(sys.getrefcount(data))
del alias
print(sys.getrefcount(data))
