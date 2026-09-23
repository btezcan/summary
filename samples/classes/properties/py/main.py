class Thermostat:
    def __init__(self) -> None:
        self._celsius = 0.0

    @property
    def celsius(self) -> float:
        return self._celsius

    @celsius.setter
    def celsius(self, value: float) -> None:
        if value < -273.15:
            raise ValueError(
                "Below absolute zero")
        self._celsius = value

    @property
    def fahrenheit(self) -> float:  # read-only
        return self._celsius * 9 / 5 + 32


t = Thermostat()
t.celsius = 21.5
print(t.celsius)
print(t.fahrenheit)
try:
    t.celsius = -300
except ValueError as e:
    print(e)
