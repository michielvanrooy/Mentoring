using Mentoring.Domain;
using Mentoring.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

// Add services from DependencyInjection class
builder.Services.AddApplication();
DependencyInjection.AddApplication(builder.Services);
var host = builder.Build();

var calculator = host.Services.GetRequiredService<ICalculatorService>();

var addValuesResult = calculator.AddNumbers(5, 10);
var profit = calculator.AddProfit();

Console.WriteLine($"5 + 10 = {addValuesResult}");
Console.WriteLine($"Calculated Added Profit: {profit}");
