using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("API is running successfully");
    }

    [Authorize]
    [HttpGet("secure")]
    public IActionResult Secure()
    {
        return Ok("You are authenticated!");
    }
}