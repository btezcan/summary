from datetime import date, timedelta

birth = date(2006, 3, 15)
today = date(2026, 9, 23)

age = today.year - birth.year
if (today.month, today.day) < (birth.month,
                               birth.day):
    age -= 1
print(age)

print((today - birth).days)
print(today + timedelta(days=30))
print(today.strftime("%A"))
print(f"{today:%Y-%m-%d}")
