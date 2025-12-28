using BackendProject.Core.Entities;

namespace BackendProject.Core.Interfaces;

public interface IOrderRepository
{
    Task<IEnumerable<Order>> GetAllAsync(CancellationToken ct = default);
    Task<IEnumerable<Order>> GetByUserIdAsync(int userId, CancellationToken ct = default);
    Task<Order?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<Order> CreateAsync(Order order, CancellationToken ct = default);
    Task DeleteAsync(int id, CancellationToken ct = default);
}
