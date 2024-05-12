using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarModelController : ControllerBase
    {
        private readonly CarSalesContext _context;

        public CarModelController(CarSalesContext context)
        {
            _context = context;
        }

        // GET: api/CarModel
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarModel>>> GetCarModels()
        {
            return await _context.CarModels.Include(cm => cm.CarBrand).ToListAsync();
        }

        // GET: api/CarModel/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CarModel>> GetCarModel(int id)
        {
            var carModel = await _context.CarModels.Include(cm => cm.CarBrand).FirstOrDefaultAsync(cm => cm.Id == id);

            if (carModel == null)
            {
                return NotFound();
            }

            return carModel;
        }

        // POST: api/CarModel
        [HttpPost]
        public async Task<ActionResult<CarModel>> PostCarModel([FromBody] CarModelDTO carModelDTO)
        {
            if (!_context.CarBrands.Any(cb => cb.Id == carModelDTO.CarBrandId))
            {
                return BadRequest("Invalid Car Brand ID");
            }

            var carModel = new CarModel
            {
                Name = carModelDTO.Name,
                CarBrandId = carModelDTO.CarBrandId
            };

            _context.CarModels.Add(carModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarModel", new { id = carModel.Id }, carModel);
        }

        // PUT: api/CarModel/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarModel(int id, CarModel carModel)
        {
            if (id != carModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(carModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarModelExists(id))
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

        // DELETE: api/CarModel/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarModel(int id)
        {
            var carModel = await _context.CarModels.FindAsync(id);
            if (carModel == null)
            {
                return NotFound();
            }

            _context.CarModels.Remove(carModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CarModelExists(int id)
        {
            return _context.CarModels.Any(e => e.Id == id);
        }
    }
}
