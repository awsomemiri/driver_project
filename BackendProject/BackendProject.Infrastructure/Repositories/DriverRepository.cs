using BackendProject.Core.Entities;
using BackendProject.Core.Interfaces;
using BackendProject.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BackendProject.Infrastructure.Repositories;

public class DriverRepository : IDriverRepository
{
    private readonly AppDbContext _db;

    public DriverRepository(AppDbContext db) => _db = db;

    public async Task<IEnumerable<Driver>> GetAllAsync(CancellationToken ct = default)
        => await _db.Drivers.AsNoTracking().ToListAsync(ct);

    public async Task<Driver?> GetByIdAsync(int id, CancellationToken ct = default)
        => await _db.Drivers.AsNoTracking().FirstOrDefaultAsync(d => d.Id == id, ct);

    public async Task<Driver> CreateAsync(Driver driver, CancellationToken ct = default)
    {
        _db.Drivers.Add(driver);
        await _db.SaveChangesAsync(ct);
        return driver;
    }

    public async Task<Driver> UpdateAsync(Driver driver, CancellationToken ct = default)
    {
        _db.Drivers.Update(driver);
        await _db.SaveChangesAsync(ct);
        return driver;
    }

    public async Task DeleteAsync(int id, CancellationToken ct = default)
    {
        var driver = await _db.Drivers.FindAsync(id);
        if (driver != null)
        {
            _db.Drivers.Remove(driver);
            await _db.SaveChangesAsync(ct);
        }
    }
}
