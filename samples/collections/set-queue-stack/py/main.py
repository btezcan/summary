from collections import deque

seen: set[str] = set()
seen.add("ali")
seen.add("ali")                # ignored
print(len(seen))
print("ali" in seen)

queue = deque(["Ali", "Veli"])
print(queue.popleft())         # first in

stack = ["Ali", "Veli"]
print(stack.pop())             # last in
