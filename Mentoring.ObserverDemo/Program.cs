using Mentoring.ObserverDemo;

var subject = new Subject();

var observerA = new Observer("Piet");
subject.Attach(observerA);

//var observerB = new Observer("Koos");
//subject.Attach(observerB);

subject.SomeBusinessLogic();


