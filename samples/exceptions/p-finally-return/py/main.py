def check() -> str:
    try:
        return "from try"
    finally:
        print("finally")


print(check())
