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
    public class OrderController : ControllerBase
    {
        private readonly CarSalesContext _context;

        public OrderController(CarSalesContext context)
        {
            _context = context;
        }

        // GET: api/Users/All
        [HttpGet]
        [Route("All")]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Car)
                    .ThenInclude(c => c.CarModel)
                    .ThenInclude(cm => cm.CarBrand)
                .Include(u => u.User)
                .ToListAsync();

            return orders;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders(int userId)
        {
            var orders = await _context.Orders
                .Where(o => o.UserId == userId) 
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Car)
                    .ThenInclude(c => c.CarModel)
                    .ThenInclude(cm => cm.CarBrand)
                .ToListAsync();

            return orders;
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder([FromBody] OrderDTO orderDto)
        {
            if (!_context.Users.Any(u => u.Id == orderDto.UserId))
            {
                return BadRequest("Invalid User ID");
            }

            var order = new Order
            {
                OrderDate = DateTime.Now,
                UserId = orderDto.UserId,
                OrderItems = orderDto.OrderItems.Select(oi => new OrderItem
                {
                    CarId = oi.CarId,
                    Price = oi.Price
                }).ToList()
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        // PUT: api/Orders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

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

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Cars.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Cars.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
