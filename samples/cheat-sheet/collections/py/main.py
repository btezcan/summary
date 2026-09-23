nums = [3, 1, 2]
nums.append(4)
nums.sort()
print(*nums)
print(f"{nums[0]} {nums[-1]}")
print(len(nums))

ages = {"Ali": 20}
ages["Can"] = 21
ece = ages.get("Ece", -1)
print(ece)
for name, age in ages.items():
    print(f"{name}={age}")

seen = {1, 2, 2}
print(len(seen))
