using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using VoiceOfChrist.API.Data;
using VoiceOfChrist.API.DTOs;

namespace VoiceOfChrist.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    // POST: api/Auth/login
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login(LoginDto loginDto)
    {
        var admin = await _context.Admins
            .FirstOrDefaultAsync(a => a.Username == loginDto.Username && a.IsActive);

        if (admin == null)
        {
            return Unauthorized(new { message = "Invalid username or password" });
        }

        // Verify password
        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(loginDto.Password, admin.PasswordHash);
        if (!isPasswordValid)
        {
            return Unauthorized(new { message = "Invalid username or password" });
        }

        // Update last login
        admin.LastLoginAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        // Generate JWT token
        var token = GenerateJwtToken(admin);

        return Ok(new LoginResponseDto
        {
            Token = token,
            Username = admin.Username,
            FullName = admin.FullName,
            Email = admin.Email
        });
    }

    private string GenerateJwtToken(Models.Admin admin)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var secretKey = jwtSettings["Secret"] ?? throw new InvalidOperationException("JWT Secret not configured");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, admin.Id.ToString()),
            new Claim(ClaimTypes.Name, admin.Username),
            new Claim(ClaimTypes.Email, admin.Email),
            new Claim("FullName", admin.FullName)
        };

        var expirationMinutes = int.Parse(jwtSettings["ExpirationInMinutes"] ?? "1440");
        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expirationMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
