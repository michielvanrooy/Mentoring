using Mentoring.Domain.Interfaces;

namespace Mentoring.Domain.Services;

public class DIMultiScopedService : IDIMultiScopedService
{
    private readonly IDIScopedService _scopedService1;
    private readonly IDIScopedService _scopedService2;
    private readonly IDIScopedService _scopedService3;

    public DIMultiScopedService(IDIScopedService scopedService1, IDIScopedService scopedService2, IDIScopedService scopedService3)
    {
        _scopedService1 = scopedService1;
        _scopedService2 = scopedService2;
        _scopedService3 = scopedService3;
    }

    public object Execute()
    {
        _scopedService1.IncrementNumber();
        var firstGet = _scopedService1.GetNumber();

        _scopedService2.IncrementNumber();
        var secondGet = _scopedService2.GetNumber();

        _scopedService3.IncrementNumber();
        var thirdGet = _scopedService3.GetNumber();

        var numbers = new
        {
            firstGet,
            secondGet,
            thirdGet,
            firstInstanceHash = _scopedService1.GetHashCode(),
            secondInstanceHash = _scopedService2.GetHashCode(),
            thirdInstanceHash = _scopedService3.GetHashCode()
        };

        return numbers;
    }
}
