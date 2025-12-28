namespace BackendProject.Core.Entities;

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public decimal TotalAmount { get; set; }
    public string PaymentStatus { get; set; } = "Paid"; // Paid/Pending/Failed

    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}


