from datetime import date

exam = date(2026, 1, 9)
print(f"{exam:%d.%m.%Y}")
print(exam.isoformat())
print(exam.strftime("%A"))
