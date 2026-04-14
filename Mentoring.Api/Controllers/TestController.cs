using Mentoring.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace Mentoring.Api.Controllers;

public class TestController : BaseController
{
    private readonly IMyService _myService;

    public TestController(IMyService myService)
    {
        _myService = myService;
    }

    [HttpGet]
    public IActionResult RunTest()
    {
        Log.Information("Application terminated unexpectedly");

        var response = _myService.DoSomething();
        return Ok(response);
    }
}
