using Mentoring.ObserverDemo.Interfaces;

namespace Mentoring.ObserverDemo;

public class Subject : ISubject
{
    private List<IObserver> _observers = new List<IObserver>();

    private List<string>  _messages = new List<string>()
    {
        "Hello",
        "World!!!",
        "This is your Observer",
        "Notifying you",
        "Something Cool",
        "Bye!! :-)"
    };

    public void Attach(IObserver observer)
    {
        this._observers.Add(observer);
    }

    public void Notify(string message)
    {
        foreach (var observer in _observers)
        {
            observer.Update(message);
        }
    }

    public void SomeBusinessLogic()
    {
        foreach(var message in _messages)
        {
            this.Notify(message);
            Thread.Sleep(2000);
        }
    }
}
