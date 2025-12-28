using AutoMapper;
using BackendProject.Core.DTOs;
using BackendProject.Core.Entities;
using BackendProject.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackendProject.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _users;
    private readonly IAuthService _authService;
    private readonly IMapper _mapper;

    public UsersController(IUserRepository users, IAuthService authService, IMapper mapper)
    {
        _users = users;
        _authService = authService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAll(CancellationToken ct)
    {
        var users = await _users.GetAllAsync(ct);
        return Ok(_mapper.Map<IEnumerable<UserDto>>(users));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<UserDto>> GetById(int id, CancellationToken ct)
    {
        var user = await _users.GetByIdAsync(id, ct);
        if (user is null) return NotFound();
        return Ok(_mapper.Map<UserDto>(user));
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(CreateUserDto dto, CancellationToken ct)
    {
        // Check if user already exists
        var existingUser = await _users.GetByEmailAsync(dto.Email, ct);
        if (existingUser is not null)
            return BadRequest("User with this email already exists");

        // Hash password (in real app, use proper password hashing)
        var user = new User
        {
            UserName = dto.UserName,
            Email = dto.Email,
            PasswordHash = dto.Password, // In real app, hash this
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Phone = dto.Phone,
            CreatedAt = DateTime.UtcNow
        };

        var createdUser = await _users.CreateAsync(user, ct);
        var userDto = _mapper.Map<UserDto>(createdUser);
        var token = await _authService.GenerateTokenAsync(createdUser);
        
        return Ok(new { user = userDto, token });
    }

    [HttpPost("login")]
    public async Task<ActionResult<object>> Login(LoginDto dto, CancellationToken ct)
    {
        var user = await _authService.ValidateUserAsync(dto);
        if (user is null)
            return Unauthorized("Invalid email or password");

        var token = await _authService.GenerateTokenAsync(user);
        return Ok(new { user, token });
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<UserDto>> Update(int id, UpdateUserDto dto, CancellationToken ct)
    {
        var user = await _users.GetByIdAsync(id, ct);
        if (user is null) return NotFound();

        user.UserName = dto.UserName;
        user.Email = dto.Email;
        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        user.Phone = dto.Phone;

        var updatedUser = await _users.UpdateAsync(user, ct);
        return Ok(_mapper.Map<UserDto>(updatedUser));
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id, CancellationToken ct)
    {
        var user = await _users.GetByIdAsync(id, ct);
        if (user is null) return NotFound();

        await _users.DeleteAsync(id, ct);
        return NoContent();
    }
}
