using AutoMapper;
using BackendProject.Core.DTOs;
using BackendProject.Core.Entities;
using BackendProject.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackendProject.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _categories;
    private readonly IMapper _mapper;

    public CategoriesController(ICategoryRepository categories, IMapper mapper)
    {
        _categories = categories;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAll(CancellationToken ct)
    {
        var categories = await _categories.GetAllAsync(ct);
        return Ok(_mapper.Map<IEnumerable<CategoryDto>>(categories));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<CategoryDto>> GetById(int id, CancellationToken ct)
    {
        var category = await _categories.GetByIdAsync(id, ct);
        if (category is null) return NotFound();
        return Ok(_mapper.Map<CategoryDto>(category));
    }

    [HttpPost]
    public async Task<ActionResult<CategoryDto>> Create(CreateCategoryDto dto, CancellationToken ct)
    {
        var category = new Category { Name = dto.Name };
        var createdCategory = await _categories.CreateAsync(category, ct);
        return CreatedAtAction(nameof(GetById), new { id = createdCategory.Id }, _mapper.Map<CategoryDto>(createdCategory));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<CategoryDto>> Update(int id, CreateCategoryDto dto, CancellationToken ct)
    {
        var category = await _categories.GetByIdAsync(id, ct);
        if (category is null) return NotFound();

        category.Name = dto.Name;
        var updatedCategory = await _categories.UpdateAsync(category, ct);
        return Ok(_mapper.Map<CategoryDto>(updatedCategory));
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id, CancellationToken ct)
    {
        var category = await _categories.GetByIdAsync(id, ct);
        if (category is null) return NotFound();

        await _categories.DeleteAsync(id, ct);
        return NoContent();
    }
}
