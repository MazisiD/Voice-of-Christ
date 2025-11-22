namespace VoiceOfChrist.API.DTOs;

public class LoginDto
{
    public required string Username { get; set; }
    public required string Password { get; set; }
}

public class LoginResponseDto
{
    public required string Token { get; set; }
    public required string Username { get; set; }
    public required string FullName { get; set; }
    public required string Email { get; set; }
}
