using BackendProject.Core.Entities;

namespace BackendProject.Core.Interfaces;

public interface IItemRepository
{
    Task<IEnumerable<Item>> GetAllAsync(CancellationToken ct = default);
    Task<Item?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<Item> CreateAsync(Item item, CancellationToken ct = default);
    Task<Item> UpdateAsync(Item item, CancellationToken ct = default);
    Task DeleteAsync(int id, CancellationToken ct = default);
}
