using Microsoft.AspNetCore.Mvc;

namespace Mentoring.Api.Controllers;

public class TestController : BaseController
{
    [HttpGet]
    public IActionResult RunTest()
    {
        return Ok("Hello wolrd");
    }
}
