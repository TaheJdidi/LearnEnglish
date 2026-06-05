using LearnEnglish.Application.DTOs;
using LearnEnglish.Domain;
using LearnEnglish.Infrastructure;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LearnEnglish.Controllers
{
    [ApiController]
    [Route("api/sessions")]
    public class SessionsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public SessionsController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SessionResponse>>> GetAll()
        {
            var sessions = await _db.Sessions
                .AsNoTracking()
                .Select(session => new SessionResponse
                {
                    Id = session.Id,
                    UserId = session.UserId,
                    CreatedAt = session.CreatedAt
                })
                .ToListAsync();

            return Ok(sessions);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<SessionResponse>> GetById(Guid id)
        {
            var session = await _db.Sessions
                .AsNoTracking()
                .Where(candidate => candidate.Id == id)
                .Select(candidate => new SessionResponse
                {
                    Id = candidate.Id,
                    UserId = candidate.UserId,
                    CreatedAt = candidate.CreatedAt
                })
                .FirstOrDefaultAsync();

            if (session == null)
            {
                return NotFound();
            }

            return Ok(session);
        }

        [HttpPost]
        public async Task<ActionResult<SessionResponse>> Create(SessionCreateRequest request)
        {
            var userExists = await _db.Users.AnyAsync(user => user.Id == request.UserId);
            if (!userExists)
            {
                return NotFound();
            }

            var session = new Session
            {
                UserId = request.UserId,
                CreatedAt = DateTime.UtcNow
            };

            _db.Sessions.Add(session);
            await _db.SaveChangesAsync();

            var response = new SessionResponse
            {
                Id = session.Id,
                UserId = session.UserId,
                CreatedAt = session.CreatedAt
            };

            return CreatedAtAction(nameof(GetById), new { id = session.Id }, response);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<SessionResponse>> Update(Guid id, SessionUpdateRequest request)
        {
            var session = await _db.Sessions.FirstOrDefaultAsync(candidate => candidate.Id == id);
            if (session == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrWhiteSpace(request.UserId) && request.UserId != session.UserId)
            {
                var userExists = await _db.Users.AnyAsync(user => user.Id == request.UserId);
                if (!userExists)
                {
                    return NotFound();
                }

                session.UserId = request.UserId;
            }

            if (request.CreatedAt.HasValue)
            {
                session.CreatedAt = request.CreatedAt.Value;
            }

            await _db.SaveChangesAsync();

            var response = new SessionResponse
            {
                Id = session.Id,
                UserId = session.UserId,
                CreatedAt = session.CreatedAt
            };

            return Ok(response);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var session = await _db.Sessions.FirstOrDefaultAsync(candidate => candidate.Id == id);
            if (session == null)
            {
                return NotFound();
            }

            _db.Sessions.Remove(session);
            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}
