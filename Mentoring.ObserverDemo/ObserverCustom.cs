using Mentoring.ObserverDemo.Interfaces;

namespace Mentoring.ObserverDemo;

public class ObserverCustom : IObserver
{
    private string _name;

    public ObserverCustom(string name)
    {
        _name = name;
    }

    public void Update(string message)
    {
        Console.WriteLine($"CUSTOM Observer DOES SOME THING ELSE ({_name}): Received message - {message}");
    }
}
