scores: list[int] = []
# The right side runs only if needed
if scores and scores[0] > 50:
    print("First score passes.")
else:
    print("No passing score.")
