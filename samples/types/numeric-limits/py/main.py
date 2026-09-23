import sys

print(2 ** 64)             # no fixed size
print(2 ** 100)
print(sys.float_info.max)  # = C# double
print(sys.float_info.dig)  # safe digits
print(sys.maxsize)         # a list-size limit,
                           # not an int limit
