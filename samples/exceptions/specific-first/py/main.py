for text in ["4", "x", "0"]:
    try:
        print(100 // int(text))
    except ValueError:
        print(f"'{text}' is not a number")
    except ZeroDivisionError:
        print("cannot divide by zero")
