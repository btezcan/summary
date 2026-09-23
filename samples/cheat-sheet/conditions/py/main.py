score = 72
if 50 <= score < 60:
    print("barely")
elif score >= 60:
    print("pass")
else:
    print("fail")

match score:
    case s if s >= 90:
        grade = "AA"
    case s if s >= 70:
        grade = "CC"
    case _:
        grade = "FF"
print(grade)
