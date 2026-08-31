using Mentoring.Domain.Interfaces;

namespace Mentoring.Domain.Services;

public class CalculatorService : ICalculatorService
{
    public readonly IBusinessIntegrationService _businessIntegration;

    public CalculatorService(IBusinessIntegrationService businessIntegration)
    {
        _businessIntegration = businessIntegration;
    }

    public int AddNumbers(int number1, int number2)
    {
        return number1 + number2;
    }

    public double AddProfit()
    {
        var businessValue = _businessIntegration.GetBusinessTotalInventoryValue();

        var profitValue = (businessValue + (businessValue * 0.2));

        var roundedValue = Math.Round(profitValue, 2);

        return roundedValue;
    }
}
