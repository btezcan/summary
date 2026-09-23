class Engine:
    def __init__(self, horsepower: int):
        self.horsepower = horsepower

    def start(self) -> str:
        hp = self.horsepower
        return f"{hp} hp engine started"


# A car HAS an engine; it is not an engine
class Car:
    def __init__(self, engine: Engine):
        self.engine = engine

    def start(self) -> str:
        return "Car: " + self.engine.start()


car = Car(Engine(150))
print(car.start())
