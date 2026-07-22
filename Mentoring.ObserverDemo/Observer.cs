using Mentoring.ObserverDemo.Interfaces;

namespace Mentoring.ObserverDemo;

public class Observer : IObserver
{
    private string _name;

    public Observer(string name)
    {
        _name = name;
    }

    public void Update(string message)
    {
        Console.WriteLine($"Observer ({_name}): Received message - {message}");
    }
}
