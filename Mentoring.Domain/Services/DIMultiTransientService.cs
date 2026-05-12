using Mentoring.Domain.Interfaces;

namespace Mentoring.Domain.Services;

public class DIMultiTransientService : IDIMultiTransientService
{
    private readonly IDITransientService _transientService1;
    private readonly IDITransientService _transientService2;
    private readonly IDITransientService _transientService3;

    public DIMultiTransientService(IDITransientService scopedService1, IDITransientService scopedService2, IDITransientService scopedService3)
    {
        _transientService1 = scopedService1;
        _transientService2 = scopedService2;
        _transientService3 = scopedService3;
    }

    public object Execute()
    {
        _transientService1.IncrementNumber();
        var firstGet = _transientService1.GetNumber();

        _transientService2.IncrementNumber();
        var secondGet = _transientService2.GetNumber();

        _transientService3.IncrementNumber();
        var thirdGet = _transientService3.GetNumber();

        var numbers = new
        {
            firstGet,
            secondGet,
            thirdGet,
            firstInstanceHash = _transientService1.GetHashCode(),
            secondInstanceHash = _transientService2.GetHashCode(),
            thirdInstanceHash = _transientService3.GetHashCode()
        };

        return numbers;
    }
}
