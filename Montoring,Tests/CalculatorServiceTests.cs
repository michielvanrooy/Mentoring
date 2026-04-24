using Mentoring.Domain.Interfaces;
using Mentoring.Domain.Services;
using Moq;
using Xunit;

namespace Montoring_Tests;

public class CalculatorServiceTests
{
    private Mock<IBusinessIntegrationService> _businessIntegrationMock = new Mock<IBusinessIntegrationService>();

    [Fact]
    public void Given_AddProfit_With_InventoryValue_100_Returns_120()
    {
        // Arrange
        _businessIntegrationMock.Setup(x => x.GetBusinessTotalInventoryValue(It.IsAny<int>())).Returns(new CustomerDto()
        {
            IsCool = true,
            IsIndependant = true,
            IsManco = true,
            IsSomethingElse = true
        });
        //_businessIntegrationMock.Setup(x => x.GetBusinessTotalInventoryValue(100)).Returns(200);
        //_businessIntegrationMock.Setup(x => x.GetBusinessTotalInventoryValue(200)).Returns(400);


        var calculator = new CalculatorService(_businessIntegrationMock.Object);

        // Act
        var result = calculator.IsLocked();

        // Assert
        Assert.False(result);
    }
}

