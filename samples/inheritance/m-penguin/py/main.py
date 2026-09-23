class Bird:
    def fly(self) -> str:
        return "flying"


class Penguin(Bird):
    def fly(self) -> str:
        raise NotImplementedError("can't fly")


for bird in [Bird(), Penguin()]:
    print(bird.fly())
