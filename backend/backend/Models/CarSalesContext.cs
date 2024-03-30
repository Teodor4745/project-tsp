using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class CarSalesContext : DbContext
    {
        public CarSalesContext(DbContextOptions<CarSalesContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<CarBrand> CarBrands { get; set; }
        public DbSet<CarModel> CarModels { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
    }
}
