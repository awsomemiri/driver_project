using BackendProject.Core.Entities;

namespace BackendProject.Core.Interfaces;

public interface ICategoryRepository
{
    Task<IEnumerable<Category>> GetAllAsync(CancellationToken ct = default);
    Task<Category?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<Category> CreateAsync(Category category, CancellationToken ct = default);
    Task<Category> UpdateAsync(Category category, CancellationToken ct = default);
    Task DeleteAsync(int id, CancellationToken ct = default);
}
