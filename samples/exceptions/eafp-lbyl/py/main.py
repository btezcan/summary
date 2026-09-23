ages = {"Ali": 20}

# EAFP: easier to ask forgiveness (idiomatic)
for name in ["Ali", "Can"]:
    try:
        print(f"{name}: {ages[name]}")
    except KeyError:
        print(f"{name}: unknown")
