using BackendProject.Core.Entities;

namespace BackendProject.Core.Interfaces;

public interface IDriverRepository
{
    Task<IEnumerable<Driver>> GetAllAsync(CancellationToken ct = default);
    Task<Driver?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<Driver> CreateAsync(Driver driver, CancellationToken ct = default);
    Task<Driver> UpdateAsync(Driver driver, CancellationToken ct = default);
    Task DeleteAsync(int id, CancellationToken ct = default);
}
