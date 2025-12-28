using AutoMapper;
using BackendProject.Core.DTOs;
using BackendProject.Core.Entities;
using BackendProject.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackendProject.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private readonly IItemRepository _items;
    private readonly IMapper _mapper;

    public ItemsController(IItemRepository items, IMapper mapper)
    {
        _items = items;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ItemDto>>> GetAll(CancellationToken ct)
    {
        var items = await _items.GetAllAsync(ct);
        return Ok(_mapper.Map<IEnumerable<ItemDto>>(items));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ItemDto>> GetById(int id, CancellationToken ct)
    {
        var item = await _items.GetByIdAsync(id, ct);
        if (item is null) return NotFound();
        return Ok(_mapper.Map<ItemDto>(item));
    }

    [HttpPost]
    public async Task<ActionResult<ItemDto>> Create(CreateItemDto dto, CancellationToken ct)
    {
        var item = _mapper.Map<Item>(dto);
        var createdItem = await _items.CreateAsync(item, ct);
        return CreatedAtAction(nameof(GetById), new { id = createdItem.Id }, _mapper.Map<ItemDto>(createdItem));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ItemDto>> Update(int id, CreateItemDto dto, CancellationToken ct)
    {
        var item = await _items.GetByIdAsync(id, ct);
        if (item is null) return NotFound();

        _mapper.Map(dto, item);
        var updatedItem = await _items.UpdateAsync(item, ct);
        return Ok(_mapper.Map<ItemDto>(updatedItem));
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id, CancellationToken ct)
    {
        var item = await _items.GetByIdAsync(id, ct);
        if (item is null) return NotFound();

        await _items.DeleteAsync(id, ct);
        return NoContent();
    }
}
