using Mentoring.Domain.Interfaces;

namespace Mentoring.Domain.Services;

public class SomeOtherService : ISomeOtherService
{
    public string DoSomethingMoreFun(string theSomething)
    {
        var result = this.LetsTryAndSoSomethingFun(theSomething);
        return result;
    }

    private string LetsTryAndSoSomethingFun(string theSomething)
    {
        throw new Exception("Something went horribly wrong and that is not fun");
    }
}
