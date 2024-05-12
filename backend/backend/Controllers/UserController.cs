using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.DTO;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly CarSalesContext _context;

        public UserController(CarSalesContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users
                                     .Include(u => u.Role)
                                     .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            user.Password = null;  
            return user;
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostCar(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Cars.Any(e => e.Id == id))
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

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Cars.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Cars.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Users/register
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register([FromBody] RegisterDTO registerDTO)
        {
            if (_context.Users.Any(u => u.Username == registerDTO.Username))
            {
                return BadRequest("Username already exists.");
            }

            var defaultRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "User");
            if (defaultRole == null)
            {
                return BadRequest("Default role not found.");
            }

            var user = new User
            {
                Firstname = registerDTO.Firstname, 
                Lastname = registerDTO.Lastname,
                Username = registerDTO.Username,
                Email = registerDTO.Email,
                Password = registerDTO.Password,
                Phone = registerDTO.Phone,
                RoleId = defaultRole.Id
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            user.Password = null; 
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }


        // POST: api/Users/login
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] LoginDTO loginDTO)
        {
            var user = await _context.Users
                                     .Include(u => u.Role)
                                     .FirstOrDefaultAsync(u => u.Username == loginDTO.Username && u.Password == loginDTO.Password);

            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            user.Password = null;
            return Ok(user);  
        }


    }
}
