namespace backend.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Color { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public int CarModelId { get; set; }
        public string? ImageUrl { get; set; }
        public CarModel CarModel { get; set; }
    }
}
