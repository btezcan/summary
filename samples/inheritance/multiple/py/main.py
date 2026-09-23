class Flyer:
    def fly(self) -> None:
        print("flying")


class Swimmer:
    def swim(self) -> None:
        print("swimming")


class Duck(Flyer, Swimmer):   # two base classes
    pass


duck = Duck()
duck.fly()
duck.swim()
print(isinstance(duck, Flyer))
print([c.__name__ for c in Duck.__mro__])
