try:
    int("x")
except Exception:
    print("something failed")
except ValueError:              # never reached
    print("not a number")
