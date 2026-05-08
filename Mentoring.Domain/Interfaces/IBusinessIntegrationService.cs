using Mentoring.Domain.Services;

namespace Mentoring.Domain.Interfaces;

public interface IBusinessIntegrationService
{
    double GetBusinessTotalInventoryValue(int someValue);
}
