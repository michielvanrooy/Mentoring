using Mentoring.Domain.Interfaces;
using Serilog;

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
        try
        {
            throw new Exception("Something went horribly wrong and that is not fun");
        }
        catch (Exception ex)
        {
            Log.Error(ex, "Something broke");

            return string.Empty;

            
        }
    }
}
