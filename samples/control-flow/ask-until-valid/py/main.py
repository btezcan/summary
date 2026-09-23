while True:
    text = input("Number (1-10): ")
    if text.isdigit() and 1 <= int(text) <= 10:
        break

number = int(text)
print(f"Thanks: {number}")
