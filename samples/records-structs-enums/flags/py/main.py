from enum import Flag, auto


class Permission(Flag):
    READ = auto()
    WRITE = auto()
    DELETE = auto()


p = Permission.READ | Permission.WRITE
print(p)
print(Permission.WRITE in p)
print(Permission.DELETE in p)
