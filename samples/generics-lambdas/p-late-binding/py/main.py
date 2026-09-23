late = [lambda: i for i in range(3)]
bound = [lambda i=i: i for i in range(3)]

print(*(f() for f in late))
print(*(f() for f in bound))
