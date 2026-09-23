MAX_SCORE = 100
score = 42
match score:
    case MAX_SCORE:
        print("perfect")
    case _:
        print("not perfect")
