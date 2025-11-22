using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VoiceOfChrist.API.Data;
using VoiceOfChrist.API.Models;

namespace VoiceOfChrist.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PastorsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PastorsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Pastors
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pastor>>> GetPastors()
    {
        return await _context.Pastors
            .Include(p => p.Branch)
            .Where(p => p.IsActive)
            .ToListAsync();
    }

    // GET: api/Pastors/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Pastor>> GetPastor(int id)
    {
        var pastor = await _context.Pastors
            .Include(p => p.Branch)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (pastor == null)
        {
            return NotFound();
        }

        return pastor;
    }

    // GET: api/Pastors/branch/5
    [HttpGet("branch/{branchId}")]
    public async Task<ActionResult<IEnumerable<Pastor>>> GetPastorsByBranch(int branchId)
    {
        return await _context.Pastors
            .Include(p => p.Branch)
            .Where(p => p.BranchId == branchId && p.IsActive)
            .ToListAsync();
    }

    // POST: api/Pastors
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Pastor>> CreatePastor(Pastor pastor)
    {
        _context.Pastors.Add(pastor);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPastor), new { id = pastor.Id }, pastor);
    }

    // PUT: api/Pastors/5
    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePastor(int id, Pastor pastor)
    {
        if (id != pastor.Id)
        {
            return BadRequest();
        }

        _context.Entry(pastor).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PastorExists(id))
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

    // DELETE: api/Pastors/5
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePastor(int id)
    {
        var pastor = await _context.Pastors.FindAsync(id);
        if (pastor == null)
        {
            return NotFound();
        }

        pastor.IsActive = false;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool PastorExists(int id)
    {
        return _context.Pastors.Any(e => e.Id == id);
    }
}
