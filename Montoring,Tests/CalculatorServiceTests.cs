using Mentoring.Domain.Interfaces;
using Mentoring.Domain.Services;
using Moq;
using Xunit;

namespace Montoring_Tests;

public class CalculatorServiceTests
{
    private Mock<IBusinessIntegrationService> _businessIntegrationMock = new Mock<IBusinessIntegrationService>();

    [Fact]
    public void Given_AddNumbers_With_Numbers_10_and_20_Returns_30()
    {
        // Arrange
        var calculator = new CalculatorService(_businessIntegrationMock.Object);

        // Act
        var result = calculator.AddNumbers(10, 20);

        // Assert
        Assert.Equal(30, result);
    }

    [Fact]
    public void Given_AddProfit_With_InventoryValue_100_Returns_120()
    {
        // Arrange
        _businessIntegrationMock.Setup(x => x.GetBusinessTotalInventoryValue()).Returns(100);

        var calculator = new CalculatorService(_businessIntegrationMock.Object);

        // Act
        var result = calculator.AddProfit();

        // Assert
        Assert.Equal(120.00, result);
    }
}

