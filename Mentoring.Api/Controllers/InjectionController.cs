using Mentoring.Domain.Interfaces;
using Mentoring.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Mentoring.Api.Controllers;

public class InjectionController : BaseController
{
    //Transient: a new instance every time it’s requested.
    //Scoped: one instance per scope. In ASP.NET Core, that usually means one instance per HTTP request.
    //Singleton: one instance for the entire app lifetime.

    private readonly IDIScopedService _scopedService;
    private readonly IDISingletonService _singletonService;
    private readonly IDITransientService _transientService;

    private readonly IDIMultiScopedService _multiScopedService;
    private readonly IDIMultiTransientService _multiTransientService;

    public InjectionController(
        IDIScopedService scopedService, 
        IDISingletonService singletonService, 
        IDITransientService transientService,
        IDIMultiScopedService multiScopedService,
        IDIMultiTransientService multiTransientService)
    {
        _scopedService = scopedService;
        _singletonService = singletonService;
        _transientService = transientService;
        _multiScopedService = multiScopedService;
        _multiTransientService = multiTransientService;
    }

    

    [HttpGet]
    public IActionResult GetNumbers()
    {
        var numbers = new
        {
            ScopedNumber = _scopedService.GetNumber(),
            SingletonNumber = _singletonService.GetNumber(),
            TransientNumber = _transientService.GetNumber()
        };
        return Ok(numbers);
    }

    [HttpPut]
    public IActionResult IncrementAllServices()
    {
        _scopedService.IncrementNumber();
        _singletonService.IncrementNumber();
        _transientService.IncrementNumber();

        return Ok();
    }

    [HttpGet]
    public IActionResult GetScopedMultipleIncrements()
    {
        var firstGet = _scopedService.GetNumber();
        _scopedService.IncrementNumber();

        var secondGet = _scopedService.GetNumber();
        _scopedService.IncrementNumber();

        var thirdGet = _scopedService.GetNumber();

        var numbers = new
        {
            firstGet,
            secondGet,
            thirdGet
        };
        return Ok(numbers);
    }

    [HttpGet]
    public IActionResult GetTransientMultipleIncrements()
    {
        var firstGet = _transientService.GetNumber();
        _transientService.IncrementNumber();

        var secondGet = _transientService.GetNumber();
        _transientService.IncrementNumber();

        var thirdGet = _transientService.GetNumber();

        var numbers = new
        {
            firstGet,
            secondGet,
            thirdGet
        };
        return Ok(numbers);
    }

    [HttpGet]
    public IActionResult GetScopedMultiple()
    {
        var result = _multiScopedService.Execute();
        return Ok(result);
    }

    [HttpGet]
    public IActionResult GetTransientMultiple()
    {
        var result = _multiTransientService.Execute();
        return Ok(result);
    }



    //[HttpGet]
    //public IActionResult GetTransientMultipleResolves()
    //{
    //    var transient1 = HttpContext.RequestServices.GetRequiredService<IDITransientService>();
    //    transient1.IncrementNumber();
    //    var firstGet = transient1.GetNumber();

    //    var transient2 = HttpContext.RequestServices.GetRequiredService<IDITransientService>();
    //    transient2.IncrementNumber();
    //    var secondGet = transient2.GetNumber();

    //    var transient3 = HttpContext.RequestServices.GetRequiredService<IDITransientService>();
    //    transient3.IncrementNumber();
    //    var thirdGet = transient3.GetNumber();

    //    var numbers = new
    //    {
    //        firstGet,
    //        secondGet,
    //        thirdGet,
    //        firstInstanceHash = transient1.GetHashCode(),
    //        secondInstanceHash = transient2.GetHashCode(),
    //        thirdInstanceHash = transient3.GetHashCode()
    //    };
    //    return Ok(numbers);
    //}

    //[HttpGet]
    //public IActionResult GetScopedMultipleResolves()
    //{
    //    var scoped1 = HttpContext.RequestServices.GetRequiredService<IDIScopedService>();
    //    scoped1.IncrementNumber();
    //    var firstGet = scoped1.GetNumber();

    //    var scoped2 = HttpContext.RequestServices.GetRequiredService<IDIScopedService>();
    //    scoped2.IncrementNumber();
    //    var secondGet = scoped2.GetNumber();

    //    var scoped3 = HttpContext.RequestServices.GetRequiredService<IDIScopedService>();
    //    scoped3.IncrementNumber();
    //    var thirdGet = scoped3.GetNumber();

    //    var numbers = new
    //    {
    //        firstGet,
    //        secondGet,
    //        thirdGet,
    //        firstInstanceHash = scoped1.GetHashCode(),
    //        secondInstanceHash = scoped2.GetHashCode(),
    //        thirdInstanceHash = scoped3.GetHashCode()
    //    };
    //    return Ok(numbers);
    //}
}
