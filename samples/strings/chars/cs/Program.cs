foreach (char c in "A7b ")
{
    bool digit = char.IsDigit(c);
    bool letter = char.IsLetter(c);
    bool upper = char.IsUpper(c);
    Console.WriteLine(
        $"'{c}' {digit} {letter} {upper}");
}
