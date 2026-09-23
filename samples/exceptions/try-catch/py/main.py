try:
    a = [0] * 3
    a[5] = 1
    print("not reached")
except IndexError as e:
    print(f"Error: {e}")
finally:
    print("finally always runs")
