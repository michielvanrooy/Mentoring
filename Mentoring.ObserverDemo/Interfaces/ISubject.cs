namespace Mentoring.ObserverDemo.Interfaces;

public interface ISubject
{
    // Attach an observer to the subject.
    void Attach(IObserver observer);

    // Notify all observers about an event.
    void Notify(string message);
}
