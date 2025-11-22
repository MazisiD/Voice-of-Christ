using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VoiceOfChrist.API.Data;
using VoiceOfChrist.API.Models;

namespace VoiceOfChrist.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChurchInfoController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ChurchInfoController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/ChurchInfo
    [HttpGet]
    public async Task<ActionResult<ChurchInfo>> GetChurchInfo()
    {
        var churchInfo = await _context.ChurchInfo.FirstOrDefaultAsync();

        if (churchInfo == null)
        {
            return NotFound();
        }

        return churchInfo;
    }

    // PUT: api/ChurchInfo/1
    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateChurchInfo(int id, ChurchInfo churchInfo)
    {
        if (id != churchInfo.Id)
        {
            return BadRequest();
        }

        churchInfo.UpdatedAt = DateTime.UtcNow;
        _context.Entry(churchInfo).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ChurchInfoExists(id))
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

    private bool ChurchInfoExists(int id)
    {
        return _context.ChurchInfo.Any(e => e.Id == id);
    }
}
