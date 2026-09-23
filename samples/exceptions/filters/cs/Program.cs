foreach (int code in new[] { 404, 500 })
{
    try
    {
        throw new HttpError(code);
    }
    catch (HttpError e) when (e.Code == 404)
    {
        Console.WriteLine("not found: handled");
    }
    catch (HttpError e)
    {
        Console.WriteLine($"error {e.Code}");
    }
}

class HttpError(int code)
    : Exception($"HTTP {code}")
{
    public int Code { get; } = code;
}
