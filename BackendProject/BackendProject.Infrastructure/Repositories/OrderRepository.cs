using BackendProject.Core.Entities;
using BackendProject.Core.Interfaces;
using BackendProject.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BackendProject.Infrastructure.Repositories;

public class OrderRepository : IOrderRepository
{
    private readonly AppDbContext _db;

    public OrderRepository(AppDbContext db) => _db = db;

    public async Task<IEnumerable<Order>> GetAllAsync(CancellationToken ct = default)
        => await _db.Orders
            .AsNoTracking()
            .Include(o => o.User)
            .Include(o => o.Items)
                .ThenInclude(oi => oi.Product)
            .ToListAsync(ct);

    public async Task<IEnumerable<Order>> GetByUserIdAsync(int userId, CancellationToken ct = default)
        => await _db.Orders
            .AsNoTracking()
            .Where(o => o.UserId == userId)
            .Include(o => o.Items)
                .ThenInclude(oi => oi.Product)
            .ToListAsync(ct);

    public async Task<Order?> GetByIdAsync(int id, CancellationToken ct = default)
        => await _db.Orders
            .AsNoTracking()
            .Include(o => o.User)
            .Include(o => o.Items)
                .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == id, ct);

    public async Task<Order> CreateAsync(Order order, CancellationToken ct = default)
    {
        _db.Orders.Add(order);
        await _db.SaveChangesAsync(ct);
        return order;
    }

    public async Task DeleteAsync(int id, CancellationToken ct = default)
    {
        var order = await _db.Orders.FindAsync(id);
        if (order != null)
        {
            _db.Orders.Remove(order);
            await _db.SaveChangesAsync(ct);
        }
    }
}
