namespace VoiceOfChrist.API.Models;

public class Pastor
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? Title { get; set; } // e.g., "Senior Pastor", "Youth Pastor"
    public string? Bio { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? PhotoUrl { get; set; }
    public DateTime? OrdainedDate { get; set; }
    public bool IsActive { get; set; } = true;
    
    // Foreign key
    public int BranchId { get; set; }
    public Branch? Branch { get; set; }
}
