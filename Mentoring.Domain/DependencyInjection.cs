namespace Mentoring.Domain;

using Mentoring.Domain.Interfaces;
using Mentoring.Domain.Services;
using Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddTransient<IMyService, MyService>();
        services.AddTransient<ISomeOtherService, SomeOtherService>();

        services.AddTransient<IBusinessIntegrationService, BusinessIntegrationService>();
        services.AddTransient<ICalculatorService, CalculatorService>();

        return services;
    }
}
