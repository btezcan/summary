for i in range(1, 11):
    if i % 2 == 0:
        continue   # skip evens
    if i > 7:
        break      # stop the loop
    print(i, end=" ")
print()
