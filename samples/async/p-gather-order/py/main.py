import asyncio


async def job(name: str, seconds: float) -> str:
    await asyncio.sleep(seconds)
    print(f"{name} finished")
    return name


async def main() -> None:
    results = await asyncio.gather(
        job("slow", 0.3), job("fast", 0.05))
    print(", ".join(results))

asyncio.run(main())
