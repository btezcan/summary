class Account:
    def __init__(self) -> None:
        self._balance = 100   # "please don't"


acc = Account()
acc._balance = -500           # allowed!
print(acc._balance)
