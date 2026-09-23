var button = new Button();
button.Clicked += () => Console.WriteLine("A");
button.Clicked += () => Console.WriteLine("B");
button.Click();

class Button
{
    public event Action? Clicked;

    public void Click() => Clicked?.Invoke();
}
