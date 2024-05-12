namespace backend.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int CarId { get; set; }
        public Car Car { get; set; }
        public decimal Price { get; set; }
    }
}
