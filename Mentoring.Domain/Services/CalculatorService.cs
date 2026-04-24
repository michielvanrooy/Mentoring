using Mentoring.Domain.Interfaces;

namespace Mentoring.Domain.Services;

public class CalculatorService : ICalculatorService
{
    public readonly IBusinessIntegrationService _businessIntegration;

    public CalculatorService(IBusinessIntegrationService businessIntegration)
    {
        _businessIntegration = businessIntegration;
    }

    //public double AddProfit()
    //{
    //    var businessValue = _businessIntegration.GetBusinessTotalInventoryValue(100);

    //    var profitValue = (businessValue + (businessValue * 0.2));

    //    var roundedValue = Math.Round(profitValue, 2);

    //    return roundedValue;
    //}

    public bool IsLocked()
    {
        var customer = _businessIntegration.GetBusinessTotalInventoryValue(100);

        return customer.IsCool && !customer.IsManco;
    }

}
