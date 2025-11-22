using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VoiceOfChrist.API.Data;
using VoiceOfChrist.API.Models;

namespace VoiceOfChrist.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BranchesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BranchesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Branches
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Branch>>> GetBranches()
    {
        return await _context.Branches
            .Include(b => b.Pastors.Where(p => p.IsActive))
            .Where(b => b.IsActive)
            .ToListAsync();
    }

    // GET: api/Branches/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Branch>> GetBranch(int id)
    {
        var branch = await _context.Branches
            .Include(b => b.Pastors.Where(p => p.IsActive))
            .Include(b => b.Events)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (branch == null)
        {
            return NotFound();
        }

        return branch;
    }

    // POST: api/Branches
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Branch>> CreateBranch(Branch branch)
    {
        _context.Branches.Add(branch);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBranch), new { id = branch.Id }, branch);
    }

    // PUT: api/Branches/5
    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBranch(int id, Branch branch)
    {
        if (id != branch.Id)
        {
            return BadRequest();
        }

        _context.Entry(branch).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!BranchExists(id))
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

    // DELETE: api/Branches/5
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBranch(int id)
    {
        var branch = await _context.Branches.FindAsync(id);
        if (branch == null)
        {
            return NotFound();
        }

        branch.IsActive = false;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool BranchExists(int id)
    {
        return _context.Branches.Any(e => e.Id == id);
    }
}
