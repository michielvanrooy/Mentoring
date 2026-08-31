namespace Mentoring.ObserverDemo.Interfaces;

public interface IObserver
{
    // Receive update from subject
    //void Update(ISubject subject);

    void Update(string message);
}
    