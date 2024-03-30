namespace backend.Models
{
    public class CarBrand
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<CarModel> CarModels { get; set; } = new List<CarModel>();
    }
}
