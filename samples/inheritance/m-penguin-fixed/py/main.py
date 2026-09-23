class Bird:
    def move(self) -> str:
        return "moving"


class FlyingBird(Bird):
    def move(self) -> str:
        return "flying"


class Penguin(Bird):
    def move(self) -> str:
        return "swimming"


for bird in [FlyingBird(), Penguin()]:
    print(bird.move())
