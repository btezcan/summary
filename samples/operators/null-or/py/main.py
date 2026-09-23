name = None
print(name or "guest")

name = ""
print(f"[{name or 'guest'}]")

count = 0
print(count or 10)    # 0 counts as "missing"
