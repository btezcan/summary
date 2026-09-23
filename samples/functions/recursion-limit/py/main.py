def countdown(n: int) -> int:
    return 1 + countdown(n - 1)  # no base case!


try:
    countdown(5)
except RecursionError as e:
    print("caught:", e)
