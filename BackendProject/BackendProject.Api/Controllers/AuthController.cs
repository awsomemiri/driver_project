using AutoMapper;
using BackendProject.Core.DTOs;
using BackendProject.Core.Entities;
using BackendProject.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackendProject.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserRepository _users;
    private readonly IAuthService _authService;
    private readonly IMapper _mapper;

    public AuthController(IUserRepository users, IAuthService authService, IMapper mapper)
    {
        _users = users;
        _authService = authService;
        _mapper = mapper;
    }

    [HttpPost("register")]
    public async Task<ActionResult<object>> Register(CreateUserDto dto, CancellationToken ct)
    {
        // Check if user already exists
        var existingUser = await _users.GetByEmailAsync(dto.Email, ct);
        if (existingUser is not null)
            return BadRequest(new { message = "User with this email already exists" });

        // Create new user
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
        
        // Log to verify user was saved
        Console.WriteLine($"✅ User saved with ID: {createdUser.Id}, Email: {createdUser.Email}");
        
        var userDto = _mapper.Map<UserDto>(createdUser);
        
        // Generate token for new user
        var token = await _authService.GenerateTokenAsync(createdUser);
        
        return Ok(new { user = userDto, token });
    }

    [HttpPost("login")]
    public async Task<ActionResult<object>> Login(LoginDto dto, CancellationToken ct)
    {
        var user = await _authService.ValidateUserAsync(dto);
        if (user is null)
            return Unauthorized(new { message = "Invalid email or password" });

        var userDto = _mapper.Map<UserDto>(user);
        var token = await _authService.GenerateTokenAsync(user);
        
        return Ok(new { user = userDto, token });
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> GetCurrentUser(CancellationToken ct)
    {
        // Get user ID from JWT token
        var userIdClaim = User.FindFirst("UserId");
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
            return Unauthorized();

        var user = await _users.GetByIdAsync(userId, ct);
        if (user is null) return NotFound();

        return Ok(_mapper.Map<UserDto>(user));
    }

    [HttpPut("update")]
    public async Task<ActionResult<UserDto>> UpdateUser(UpdateUserDto dto, CancellationToken ct)
    {
        // Get user ID from JWT token
        var userIdClaim = User.FindFirst("UserId");
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
            return Unauthorized();

        var user = await _users.GetByIdAsync(userId, ct);
        if (user is null) return NotFound();

        user.UserName = dto.UserName;
        user.Email = dto.Email;
        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        user.Phone = dto.Phone;

        var updatedUser = await _users.UpdateAsync(user, ct);
        return Ok(_mapper.Map<UserDto>(updatedUser));
    }
}

