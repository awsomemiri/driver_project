using BackendProject.Core.Entities;
using BackendProject.Core.Interfaces;
using BackendProject.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BackendProject.Infrastructure.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly AppDbContext _db;

    public CategoryRepository(AppDbContext db) => _db = db;

    public async Task<IEnumerable<Category>> GetAllAsync(CancellationToken ct = default)
        => await _db.Categories.AsNoTracking().ToListAsync(ct);

    public async Task<Category?> GetByIdAsync(int id, CancellationToken ct = default)
        => await _db.Categories.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id, ct);

    public async Task<Category> CreateAsync(Category category, CancellationToken ct = default)
    {
        _db.Categories.Add(category);
        await _db.SaveChangesAsync(ct);
        return category;
    }

    public async Task<Category> UpdateAsync(Category category, CancellationToken ct = default)
    {
        _db.Categories.Update(category);
        await _db.SaveChangesAsync(ct);
        return category;
    }

    public async Task DeleteAsync(int id, CancellationToken ct = default)
    {
        var category = await _db.Categories.FindAsync(id);
        if (category != null)
        {
            _db.Categories.Remove(category);
            await _db.SaveChangesAsync(ct);
        }
    }
}
