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

        services.AddTransient<IBusinessIntegrationService, BusinessIntegrationService>();
        services.AddTransient<IBusinessIntegrationService, BusinessIntegrationService>();

        services.AddTransient<IDITransientService, DITransientService>();
        services.AddScoped<IDIScopedService, DIScopedService>();
        services.AddSingleton<IDISingletonService, DISingletonService>();

        services.AddTransient<IDIMultiScopedService, DIMultiScopedService>();
        services.AddTransient<IDIMultiTransientService, DIMultiTransientService>();

        return services;
    }
}
