try:
    int("x")
except ValueError:
    print("not a number")
except Exception:
    print("something failed")
