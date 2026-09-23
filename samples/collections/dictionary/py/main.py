ages = {"Ali": 20, "Ayşe": 22}
ages["Can"] = 19             # add or replace
print(len(ages))
print("Can" in ages)

print(ages.get("Zeynep", "no Zeynep"))

for name, age in ages.items():
    print(f"{name}: {age}")
