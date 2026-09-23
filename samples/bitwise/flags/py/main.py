from enum import Flag


class Permission(Flag):
    NONE = 0
    READ = 1          # 0b001
    WRITE = 2         # 0b010
    EXECUTE = 4       # 0b100


mine = Permission.READ | Permission.WRITE

print(mine)
print(Permission.WRITE in mine)
print(bool(mine & Permission.EXECUTE))
print(mine.value)

mine &= ~Permission.WRITE        # remove a flag
print(mine)
