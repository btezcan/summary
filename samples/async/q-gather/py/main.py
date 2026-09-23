import asyncio


async def double(n: int) -> int:
    await asyncio.sleep(0)
    return n * 2


async def main() -> None:
    results = await asyncio.gather(
        double(1), double(2))
    print(results)

asyncio.run(main())
