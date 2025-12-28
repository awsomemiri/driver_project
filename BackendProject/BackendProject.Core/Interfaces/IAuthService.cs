using BackendProject.Core.DTOs;
using BackendProject.Core.Entities;

namespace BackendProject.Core.Interfaces;

public interface IAuthService
{
    Task<string> GenerateTokenAsync(User user);
    Task<User?> ValidateUserAsync(LoginDto loginDto);
}
