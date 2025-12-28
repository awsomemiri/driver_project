using BackendProject.Core.Entities;

namespace BackendProject.Core.Interfaces;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllAsync(CancellationToken ct = default);
    Task<Product?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<IEnumerable<Product>> GetByCategoryAsync(int categoryId, CancellationToken ct = default);
    Task<Product> CreateAsync(Product product, CancellationToken ct = default);
    Task<Product> UpdateAsync(Product product, CancellationToken ct = default);
    Task DeleteAsync(int id, CancellationToken ct = default);
    Task AddRangeAsync(IEnumerable<Product> products, CancellationToken ct = default);
}


