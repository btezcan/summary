import asyncio


async def fetch(name: str, ms: int) -> str:
    await asyncio.sleep(ms / 1000)  # "I/O"
    return name.upper()


async def main() -> None:
    results = await asyncio.gather(
        fetch("a", 200), fetch("b", 100))
    print(*results)


asyncio.run(main())
