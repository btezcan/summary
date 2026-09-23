text = input("Age: ")
try:
    age = int(text)
    print(f"Next year: {age + 1}")
except ValueError:
    print("Please enter a number.")
