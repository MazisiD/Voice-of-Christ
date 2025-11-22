namespace VoiceOfChrist.API.Models;

public class Event
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public DateTime EventDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Location { get; set; }
    public string? ImageUrl { get; set; }
    public EventType Type { get; set; } = EventType.General;
    public EventStatus Status { get; set; } = EventStatus.Upcoming;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    
    // Foreign key (optional - event can be church-wide or branch-specific)
    public int? BranchId { get; set; }
    public Branch? Branch { get; set; }
}

public enum EventType
{
    General,
    Service,
    Prayer,
    Youth,
    Women,
    Men,
    Children,
    Conference,
    Outreach,
    Other
}

public enum EventStatus
{
    Upcoming,
    Completed,
    Cancelled
}
