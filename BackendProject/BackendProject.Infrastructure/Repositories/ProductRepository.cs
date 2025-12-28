using BackendProject.Core.Entities;
using BackendProject.Core.Interfaces;
using BackendProject.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BackendProject.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _db;
    public ProductRepository(AppDbContext db) => _db = db;

    public async Task<IEnumerable<Product>> GetAllAsync(CancellationToken ct = default)
        => await _db.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .ToListAsync(ct);

    public async Task<Product?> GetByIdAsync(int id, CancellationToken ct = default)
        => await _db.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id, ct);

    public async Task<IEnumerable<Product>> GetByCategoryAsync(int categoryId, CancellationToken ct = default)
        => await _db.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Where(p => p.CategoryId == categoryId)
            .ToListAsync(ct);

    public async Task<Product> CreateAsync(Product product, CancellationToken ct = default)
    {
        _db.Products.Add(product);
        await _db.SaveChangesAsync(ct);
        return product;
    }

    public async Task<Product> UpdateAsync(Product product, CancellationToken ct = default)
    {
        _db.Products.Update(product);
        await _db.SaveChangesAsync(ct);
        return product;
    }

    public async Task DeleteAsync(int id, CancellationToken ct = default)
    {
        var product = await _db.Products.FindAsync(id);
        if (product != null)
        {
            _db.Products.Remove(product);
            await _db.SaveChangesAsync(ct);
        }
    }

    public async Task AddRangeAsync(IEnumerable<Product> products, CancellationToken ct = default)
    {
        await _db.Products.AddRangeAsync(products, ct);
        await _db.SaveChangesAsync(ct);
    }
}


