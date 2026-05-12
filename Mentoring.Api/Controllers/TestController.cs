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
        //try
        //{
            var response = _myService.DoSomething();
            return Ok(response);
        //}
        //catch (Exception ex)
        //{
        //    Log.Error(ex , "Something went wrong in the test controller");

        //    return BadRequest("Broken");
        //}
    }
}
