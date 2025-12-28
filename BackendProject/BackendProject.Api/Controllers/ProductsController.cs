using AutoMapper;
using BackendProject.Core.DTOs;
using BackendProject.Core.Entities;
using BackendProject.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackendProject.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _products;
    private readonly IMapper _mapper;

    public ProductsController(IProductRepository products, IMapper mapper)
    {
        _products = products;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll(CancellationToken ct)
    {
        var list = await _products.GetAllAsync(ct);
        return Ok(_mapper.Map<IEnumerable<ProductDto>>(list));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductDto>> GetById(int id, CancellationToken ct)
    {
        var product = await _products.GetByIdAsync(id, ct);
        if (product is null) return NotFound();
        return Ok(_mapper.Map<ProductDto>(product));
    }

    [HttpGet("category/{categoryId:int}")]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetByCategory(int categoryId, CancellationToken ct)
    {
        var products = await _products.GetByCategoryAsync(categoryId, ct);
        return Ok(_mapper.Map<IEnumerable<ProductDto>>(products));
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create(CreateProductDto dto, CancellationToken ct)
    {
        var product = _mapper.Map<Product>(dto);
        var createdProduct = await _products.CreateAsync(product, ct);
        return CreatedAtAction(nameof(GetById), new { id = createdProduct.Id }, _mapper.Map<ProductDto>(createdProduct));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ProductDto>> Update(int id, CreateProductDto dto, CancellationToken ct)
    {
        var product = await _products.GetByIdAsync(id, ct);
        if (product is null) return NotFound();

        _mapper.Map(dto, product);
        var updatedProduct = await _products.UpdateAsync(product, ct);
        return Ok(_mapper.Map<ProductDto>(updatedProduct));
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id, CancellationToken ct)
    {
        var product = await _products.GetByIdAsync(id, ct);
        if (product is null) return NotFound();

        await _products.DeleteAsync(id, ct);
        return NoContent();
    }
}


