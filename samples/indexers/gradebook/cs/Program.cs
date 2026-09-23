var book = new Gradebook();
book["Ali"] = 85;
book["Ayşe"] = 92;
Console.WriteLine(book["Ayşe"]);
Console.WriteLine(book["Can"]);
Console.WriteLine(book.Count);

class Gradebook
{
    private readonly Dictionary<string, int> _grades = new();

    public int Count => _grades.Count;

    // An indexer: book["Ali"] reads and writes
    public int this[string name]
    {
        get => _grades.GetValueOrDefault(name);
        set => _grades[name] = value;
    }
}
