namespace backend.Models
{
    public class CarModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CarBrandId { get; set; }
        public CarBrand CarBrand { get; set; }
        public List<Car> Cars { get; set; } = new List<Car>();
    }
}
