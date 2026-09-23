try:
    n = int("5")
except ValueError:
    print("error")
else:
    print("ok", n)
finally:
    print("end")
