using Mentoring.Domain.Interfaces;

namespace Mentoring.Domain.Services;

public class MyService : IMyService
{
    private readonly ISomeOtherService _someOtherService;

    public MyService(ISomeOtherService someOtherService)
    {
        _someOtherService = someOtherService;
    }

    public string DoSomething()
    {
        var result = _someOtherService.DoSomethingMoreFun("Lekker man, lekker");
        return result;
    }
}
