using AutoMapper;
using BackendProject.Core.DTOs;
using BackendProject.Core.Entities;
using BackendProject.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackendProject.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DriversController : ControllerBase
{
    private readonly IDriverRepository _drivers;
    private readonly IMapper _mapper;

    public DriversController(IDriverRepository drivers, IMapper mapper)
    {
        _drivers = drivers;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DriverDto>>> GetAll(CancellationToken ct)
    {
        var drivers = await _drivers.GetAllAsync(ct);
        return Ok(_mapper.Map<IEnumerable<DriverDto>>(drivers));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<DriverDto>> GetById(int id, CancellationToken ct)
    {
        var driver = await _drivers.GetByIdAsync(id, ct);
        if (driver is null) return NotFound();
        return Ok(_mapper.Map<DriverDto>(driver));
    }

    [HttpPost]
    public async Task<ActionResult<DriverDto>> Create(CreateDriverDto dto, CancellationToken ct)
    {
        var driver = _mapper.Map<Driver>(dto);
        var createdDriver = await _drivers.CreateAsync(driver, ct);
        return CreatedAtAction(nameof(GetById), new { id = createdDriver.Id }, _mapper.Map<DriverDto>(createdDriver));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<DriverDto>> Update(int id, CreateDriverDto dto, CancellationToken ct)
    {
        var driver = await _drivers.GetByIdAsync(id, ct);
        if (driver is null) return NotFound();

        _mapper.Map(dto, driver);
        var updatedDriver = await _drivers.UpdateAsync(driver, ct);
        return Ok(_mapper.Map<DriverDto>(updatedDriver));
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id, CancellationToken ct)
    {
        var driver = await _drivers.GetByIdAsync(id, ct);
        if (driver is null) return NotFound();

        await _drivers.DeleteAsync(id, ct);
        return NoContent();
    }
}
