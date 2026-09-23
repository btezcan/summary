INotifier[] notifiers =
    { new EmailNotifier(), new SmsNotifier() };
foreach (INotifier n in notifiers)
    new ExamService(n).Announce("Ali", 85);

interface INotifier
{
    void Send(string to, string msg);
}

class EmailNotifier : INotifier
{
    public void Send(string to, string msg) =>
        Console.WriteLine($"Email {to}: {msg}");
}

class SmsNotifier : INotifier
{
    public void Send(string to, string msg) =>
        Console.WriteLine($"SMS {to}: {msg}");
}

class ExamService(INotifier notifier)
{
    public void Announce(string to, int score)
        => notifier.Send(to, $"Score: {score}");
}
