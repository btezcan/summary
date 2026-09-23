# Rebinding b doesn't touch a
a = 5
b = a
b = 10
print(a)

# Two names, one list
x = [1, 2, 3]
y = x
y[0] = 99
print(x[0])
