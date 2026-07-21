using Mentoring.Domain.Interfaces;

namespace Mentoring.Domain.Services;

public class DITransientService : IDITransientService
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

    private void Execeuet()
    {
        var number = 2; 

        addOne(number);

        Console.Write(number);
    }

    public void addOne(int value)
    {
        value = value + 1;
    }

}
