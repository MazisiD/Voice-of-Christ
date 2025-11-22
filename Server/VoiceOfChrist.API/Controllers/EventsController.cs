using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VoiceOfChrist.API.Data;
using VoiceOfChrist.API.Models;

namespace VoiceOfChrist.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public EventsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Events
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
    {
        return await _context.Events
            .Include(e => e.Branch)
            .OrderByDescending(e => e.EventDate)
            .ToListAsync();
    }

    // GET: api/Events/upcoming
    [HttpGet("upcoming")]
    public async Task<ActionResult<IEnumerable<Event>>> GetUpcomingEvents()
    {
        return await _context.Events
            .Include(e => e.Branch)
            .Where(e => e.Status == EventStatus.Upcoming && e.EventDate >= DateTime.UtcNow)
            .OrderBy(e => e.EventDate)
            .ToListAsync();
    }

    // GET: api/Events/past
    [HttpGet("past")]
    public async Task<ActionResult<IEnumerable<Event>>> GetPastEvents()
    {
        return await _context.Events
            .Include(e => e.Branch)
            .Where(e => e.Status == EventStatus.Completed || e.EventDate < DateTime.UtcNow)
            .OrderByDescending(e => e.EventDate)
            .ToListAsync();
    }

    // GET: api/Events/year/2025
    [HttpGet("year/{year}")]
    public async Task<ActionResult<IEnumerable<Event>>> GetEventsByYear(int year)
    {
        return await _context.Events
            .Include(e => e.Branch)
            .Where(e => e.EventDate.Year == year)
            .OrderBy(e => e.EventDate)
            .ToListAsync();
    }

    // GET: api/Events/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Event>> GetEvent(int id)
    {
        var eventItem = await _context.Events
            .Include(e => e.Branch)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (eventItem == null)
        {
            return NotFound();
        }

        return eventItem;
    }

    // POST: api/Events
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Event>> CreateEvent(Event eventItem)
    {
        eventItem.CreatedAt = DateTime.UtcNow;
        _context.Events.Add(eventItem);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEvent), new { id = eventItem.Id }, eventItem);
    }

    // PUT: api/Events/5
    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEvent(int id, Event eventItem)
    {
        if (id != eventItem.Id)
        {
            return BadRequest();
        }

        eventItem.UpdatedAt = DateTime.UtcNow;
        _context.Entry(eventItem).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!EventExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/Events/5
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var eventItem = await _context.Events.FindAsync(id);
        if (eventItem == null)
        {
            return NotFound();
        }

        _context.Events.Remove(eventItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool EventExists(int id)
    {
        return _context.Events.Any(e => e.Id == id);
    }
}
