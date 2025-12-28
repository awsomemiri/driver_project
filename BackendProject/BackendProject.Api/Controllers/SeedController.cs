using BackendProject.Infrastructure.Seed;
using Microsoft.AspNetCore.Mvc;

namespace BackendProject.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SeedController : ControllerBase
{
    private readonly JsonSeeder _seeder;

    public SeedController(JsonSeeder seeder)
    {
        _seeder = seeder;
    }

    [HttpPost("load-data")]
    public async Task<IActionResult> LoadData(CancellationToken ct = default)
    {
        try
        {
            var jsonPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "data.json");
            await _seeder.SeedAllAsync(jsonPath, ct);
            return Ok(new { message = "Data loaded successfully!" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = "Error loading data", error = ex.Message });
        }
    }
}
