using Mentoring.Domain.Interfaces;

namespace Mentoring.Domain.Services;

public class DISingletonService : IDISingletonService
{
    public int _mySeriveNumber = 0;

    public int GetNumber()
    {
        return _mySeriveNumber;
    }

    public void IncrementNumber()
    {
        _mySeriveNumber++;
    }
}
