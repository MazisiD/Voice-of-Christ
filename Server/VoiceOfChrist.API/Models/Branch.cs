namespace VoiceOfChrist.API.Models;

public class Branch
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Address { get; set; }
    public required string City { get; set; }
    public string? Province { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public DateTime EstablishedDate { get; set; }
    public bool IsActive { get; set; } = true;
    
    // Navigation properties
    public ICollection<Pastor> Pastors { get; set; } = new List<Pastor>();
    public ICollection<Event> Events { get; set; } = new List<Event>();
}
