def count(n: int) -> None:
    if n == 0:
        return
    print(n, end=" ")
    count(n - 1)
    print(n, end=" ")


count(3)
print()
