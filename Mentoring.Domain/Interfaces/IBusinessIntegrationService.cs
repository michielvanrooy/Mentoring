using Mentoring.Domain.Services;

namespace Mentoring.Domain.Interfaces;

public interface IBusinessIntegrationService
{
    CustomerDto GetBusinessTotalInventoryValue(int someValue);
}
