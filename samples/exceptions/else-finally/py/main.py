for text in ["7", "x"]:
    print(text)
    try:
        n = int(text)
    except ValueError:
        print("  bad input")
    else:                     # only if no error
        print(f"  parsed {n}")
    finally:
        print("  done")
