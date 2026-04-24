using Mentoring.Domain.Interfaces;

namespace Mentoring.Domain.Services;

public class BusinessIntegrationService : IBusinessIntegrationService
{
    public CustomerDto GetBusinessTotalInventoryValue(int someValue)
    {
        return new CustomerDto();
    }
}
