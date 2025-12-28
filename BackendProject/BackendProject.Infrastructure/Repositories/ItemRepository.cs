using BackendProject.Core.Entities;
using BackendProject.Core.Interfaces;
using BackendProject.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BackendProject.Infrastructure.Repositories;

public class ItemRepository : IItemRepository
{
    private readonly AppDbContext _db;

    public ItemRepository(AppDbContext db) => _db = db;

    public async Task<IEnumerable<Item>> GetAllAsync(CancellationToken ct = default)
        => await _db.Items.AsNoTracking().ToListAsync(ct);

    public async Task<Item?> GetByIdAsync(int id, CancellationToken ct = default)
        => await _db.Items.AsNoTracking().FirstOrDefaultAsync(i => i.Id == id, ct);

    public async Task<Item> CreateAsync(Item item, CancellationToken ct = default)
    {
        _db.Items.Add(item);
        await _db.SaveChangesAsync(ct);
        return item;
    }

    public async Task<Item> UpdateAsync(Item item, CancellationToken ct = default)
    {
        _db.Items.Update(item);
        await _db.SaveChangesAsync(ct);
        return item;
    }

    public async Task DeleteAsync(int id, CancellationToken ct = default)
    {
        var item = await _db.Items.FindAsync(id);
        if (item != null)
        {
            _db.Items.Remove(item);
            await _db.SaveChangesAsync(ct);
        }
    }
}
