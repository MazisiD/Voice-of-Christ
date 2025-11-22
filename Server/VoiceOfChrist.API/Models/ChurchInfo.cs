namespace VoiceOfChrist.API.Models;

public class ChurchInfo
{
    public int Id { get; set; }
    public required string Mission { get; set; }
    public required string Vision { get; set; }
    public required string Beliefs { get; set; }
    public string? History { get; set; }
    public string? ContactEmail { get; set; }
    public string? ContactPhone { get; set; }
    public DateTime? FoundedDate { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
