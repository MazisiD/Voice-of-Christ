using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VoiceOfChrist.API.Data;
using VoiceOfChrist.API.Models;

namespace VoiceOfChrist.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // Require authentication for all admin endpoints
public class AdminController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<AdminController> _logger;

 public AdminController(ApplicationDbContext context, ILogger<AdminController> logger)
    {
        _context = context;
     _logger = logger;
    }

#region Branch Management

 // GET: api/Admin/branches
    [HttpGet("branches")]
    public async Task<ActionResult<IEnumerable<BranchWithDetailsDto>>> GetBranches()
    {
        var branches = await _context.Branches
       .Include(b => b.Pastors)
   .Include(b => b.Events)
    .Select(b => new BranchWithDetailsDto
       {
      Id = b.Id,
     Name = b.Name,
   Address = b.Address,
        City = b.City,
        Province = b.Province,
          PhoneNumber = b.PhoneNumber,
         Email = b.Email,
        EstablishedDate = b.EstablishedDate,
          IsActive = b.IsActive,
        PastorCount = b.Pastors.Count,
  EventCount = b.Events.Count
            })
            .ToListAsync();

        return Ok(branches);
    }

    // GET: api/Admin/branches/{id}
    [HttpGet("branches/{id}")]
    public async Task<ActionResult<Branch>> GetBranch(int id)
    {
        var branch = await _context.Branches
        .Include(b => b.Pastors)
          .Include(b => b.Events)
     .FirstOrDefaultAsync(b => b.Id == id);

     if (branch == null)
        {
         return NotFound($"Branch with ID {id} not found.");
        }

        return Ok(branch);
    }

  // POST: api/Admin/branches
    [HttpPost("branches")]
    public async Task<ActionResult<Branch>> CreateBranch(CreateBranchDto createBranchDto)
    {
        var branch = new Branch
 {
        Name = createBranchDto.Name,
     Address = createBranchDto.Address,
            City = createBranchDto.City,
            Province = createBranchDto.Province,
 PhoneNumber = createBranchDto.PhoneNumber,
            Email = createBranchDto.Email,
         EstablishedDate = createBranchDto.EstablishedDate,
      IsActive = true
        };

        _context.Branches.Add(branch);
        await _context.SaveChangesAsync();

_logger.LogInformation("New branch created: {BranchName} in {City}", branch.Name, branch.City);

        return CreatedAtAction(nameof(GetBranch), new { id = branch.Id }, branch);
    }

    // PUT: api/Admin/branches/{id}
 [HttpPut("branches/{id}")]
    public async Task<IActionResult> UpdateBranch(int id, UpdateBranchDto updateBranchDto)
    {
   var branch = await _context.Branches.FindAsync(id);
        if (branch == null)
        {
       return NotFound($"Branch with ID {id} not found.");
}

 branch.Name = updateBranchDto.Name;
     branch.Address = updateBranchDto.Address;
 branch.City = updateBranchDto.City;
        branch.Province = updateBranchDto.Province;
        branch.PhoneNumber = updateBranchDto.PhoneNumber;
  branch.Email = updateBranchDto.Email;
        branch.EstablishedDate = updateBranchDto.EstablishedDate;
        branch.IsActive = updateBranchDto.IsActive;

        await _context.SaveChangesAsync();

     _logger.LogInformation("Branch updated: {BranchName} (ID: {BranchId})", branch.Name, branch.Id);

   return NoContent();
    }

    // DELETE: api/Admin/branches/{id}
    [HttpDelete("branches/{id}")]
    public async Task<IActionResult> DeleteBranch(int id)
    {
   var branch = await _context.Branches
    .Include(b => b.Pastors)
          .Include(b => b.Events)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (branch == null)
      {
          return NotFound($"Branch with ID {id} not found.");
        }

   // Check if branch has active pastors or upcoming events
        if (branch.Pastors.Any(p => p.IsActive) || branch.Events.Any(e => e.Status == EventStatus.Upcoming))
 {
            return BadRequest("Cannot delete branch with active pastors or upcoming events. Please reassign or complete them first.");
    }

  _context.Branches.Remove(branch);
        await _context.SaveChangesAsync();

  _logger.LogInformation("Branch deleted: {BranchName} (ID: {BranchId})", branch.Name, branch.Id);

   return NoContent();
    }

    #endregion

    #region Event Management

    // GET: api/Admin/events
[HttpGet("events")]
    public async Task<ActionResult<IEnumerable<EventWithBranchDto>>> GetEvents([FromQuery] int? branchId = null)
    {
        IQueryable<Event> query = _context.Events.Include(e => e.Branch);

        if (branchId.HasValue)
        {
        query = query.Where(e => e.BranchId == branchId);
        }

        var events = await query
  .Select(e => new EventWithBranchDto
     {
     Id = e.Id,
          Title = e.Title,
       Description = e.Description,
    EventDate = e.EventDate,
        EndDate = e.EndDate,
      Location = e.Location,
          ImageUrl = e.ImageUrl,
                Type = e.Type,
      Status = e.Status,
     CreatedAt = e.CreatedAt,
   UpdatedAt = e.UpdatedAt,
                BranchId = e.BranchId,
          BranchName = e.Branch != null ? e.Branch.Name : null
})
            .OrderBy(e => e.EventDate)
        .ToListAsync();

        return Ok(events);
    }

    // GET: api/Admin/events/{id}
    [HttpGet("events/{id}")]
  public async Task<ActionResult<Event>> GetEvent(int id)
    {
        var eventItem = await _context.Events
            .Include(e => e.Branch)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (eventItem == null)
        {
    return NotFound($"Event with ID {id} not found.");
        }

        return Ok(eventItem);
    }

    // POST: api/Admin/events
    [HttpPost("events")]
    public async Task<ActionResult<Event>> CreateEvent(CreateEventDto createEventDto)
    {
        // Validate branch exists if specified
   if (createEventDto.BranchId.HasValue)
        {
            var branchExists = await _context.Branches.AnyAsync(b => b.Id == createEventDto.BranchId && b.IsActive);
  if (!branchExists)
            {
          return BadRequest("Invalid or inactive branch specified.");
            }
        }

        var eventItem = new Event
        {
            Title = createEventDto.Title,
          Description = createEventDto.Description,
   EventDate = createEventDto.EventDate,
     EndDate = createEventDto.EndDate,
            Location = createEventDto.Location,
            ImageUrl = createEventDto.ImageUrl,
       Type = createEventDto.Type,
Status = createEventDto.Status,
     BranchId = createEventDto.BranchId,
          CreatedAt = DateTime.UtcNow
 };

        _context.Events.Add(eventItem);
        await _context.SaveChangesAsync();

        _logger.LogInformation("New event created: {EventTitle} on {EventDate}", eventItem.Title, eventItem.EventDate);

        return CreatedAtAction(nameof(GetEvent), new { id = eventItem.Id }, eventItem);
    }

  // PUT: api/Admin/events/{id}
    [HttpPut("events/{id}")]
    public async Task<IActionResult> UpdateEvent(int id, UpdateEventDto updateEventDto)
    {
     var eventItem = await _context.Events.FindAsync(id);
        if (eventItem == null)
      {
   return NotFound($"Event with ID {id} not found.");
     }

        // Validate branch exists if specified
        if (updateEventDto.BranchId.HasValue)
   {
    var branchExists = await _context.Branches.AnyAsync(b => b.Id == updateEventDto.BranchId && b.IsActive);
      if (!branchExists)
   {
return BadRequest("Invalid or inactive branch specified.");
      }
 }

        eventItem.Title = updateEventDto.Title;
        eventItem.Description = updateEventDto.Description;
        eventItem.EventDate = updateEventDto.EventDate;
        eventItem.EndDate = updateEventDto.EndDate;
        eventItem.Location = updateEventDto.Location;
   eventItem.ImageUrl = updateEventDto.ImageUrl;
        eventItem.Type = updateEventDto.Type;
        eventItem.Status = updateEventDto.Status;
   eventItem.BranchId = updateEventDto.BranchId;
        eventItem.UpdatedAt = DateTime.UtcNow;

     await _context.SaveChangesAsync();

      _logger.LogInformation("Event updated: {EventTitle} (ID: {EventId})", eventItem.Title, eventItem.Id);

  return NoContent();
    }

    // DELETE: api/Admin/events/{id}
    [HttpDelete("events/{id}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var eventItem = await _context.Events.FindAsync(id);
        if (eventItem == null)
        {
       return NotFound($"Event with ID {id} not found.");
   }

        _context.Events.Remove(eventItem);
        await _context.SaveChangesAsync();

  _logger.LogInformation("Event deleted: {EventTitle} (ID: {EventId})", eventItem.Title, eventItem.Id);

return NoContent();
    }

    // PATCH: api/Admin/events/{id}/status
    [HttpPatch("events/{id}/status")]
    public async Task<IActionResult> UpdateEventStatus(int id, [FromBody] EventStatus newStatus)
    {
        var eventItem = await _context.Events.FindAsync(id);
        if (eventItem == null)
   {
     return NotFound($"Event with ID {id} not found.");
   }

        eventItem.Status = newStatus;
  eventItem.UpdatedAt = DateTime.UtcNow;

    await _context.SaveChangesAsync();

        _logger.LogInformation("Event status updated: {EventTitle} (ID: {EventId}) -> {NewStatus}", 
   eventItem.Title, eventItem.Id, newStatus);

     return NoContent();
    }

    #endregion

#region Statistics

    // GET: api/Admin/statistics
    [HttpGet("statistics")]
    public async Task<ActionResult<AdminStatisticsDto>> GetStatistics()
    {
        var totalBranches = await _context.Branches.CountAsync(b => b.IsActive);
        var totalPastors = await _context.Pastors.CountAsync(p => p.IsActive);
        var totalEvents = await _context.Events.CountAsync();
    var upcomingEvents = await _context.Events.CountAsync(e => e.Status == EventStatus.Upcoming);
      var completedEvents = await _context.Events.CountAsync(e => e.Status == EventStatus.Completed);

   var recentEvents = await _context.Events
      .Where(e => e.CreatedAt >= DateTime.UtcNow.AddDays(-30))
     .CountAsync();

    var statistics = new AdminStatisticsDto
        {
            TotalBranches = totalBranches,
     TotalPastors = totalPastors,
        TotalEvents = totalEvents,
UpcomingEvents = upcomingEvents,
   CompletedEvents = completedEvents,
            RecentEvents = recentEvents
        };

        return Ok(statistics);
    }

    #endregion
}

// DTOs for Admin Controller
public class BranchWithDetailsDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string? Province { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public DateTime EstablishedDate { get; set; }
    public bool IsActive { get; set; }
    public int PastorCount { get; set; }
    public int EventCount { get; set; }
}

public class CreateBranchDto
{
    public required string Name { get; set; }
    public required string Address { get; set; }
    public required string City { get; set; }
    public string? Province { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public DateTime EstablishedDate { get; set; } = DateTime.UtcNow;
}

public class UpdateBranchDto
{
 public required string Name { get; set; }
    public required string Address { get; set; }
    public required string City { get; set; }
    public string? Province { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public DateTime EstablishedDate { get; set; }
    public bool IsActive { get; set; }
}

public class EventWithBranchDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime EventDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Location { get; set; }
    public string? ImageUrl { get; set; }
    public EventType Type { get; set; }
    public EventStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public int? BranchId { get; set; }
    public string? BranchName { get; set; }
}

public class CreateEventDto
{
    public required string Title { get; set; }
    public string? Description { get; set; }
    public DateTime EventDate { get; set; }
    public DateTime? EndDate { get; set; }
  public string? Location { get; set; }
    public string? ImageUrl { get; set; }
public EventType Type { get; set; } = EventType.General;
    public EventStatus Status { get; set; } = EventStatus.Upcoming;
    public int? BranchId { get; set; }
}

public class UpdateEventDto
{
    public required string Title { get; set; }
    public string? Description { get; set; }
    public DateTime EventDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Location { get; set; }
    public string? ImageUrl { get; set; }
    public EventType Type { get; set; }
    public EventStatus Status { get; set; }
    public int? BranchId { get; set; }
}

public class AdminStatisticsDto
{
    public int TotalBranches { get; set; }
    public int TotalPastors { get; set; }
    public int TotalEvents { get; set; }
    public int UpcomingEvents { get; set; }
    public int CompletedEvents { get; set; }
    public int RecentEvents { get; set; }
}