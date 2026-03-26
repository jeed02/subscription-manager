namespace backend.Models;

public class Budget
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public Guid? CategoryId { get; set; }
    public Category? Category { get; set; }
    public decimal MonthlyLimit { get; set; }
    public decimal AlertThreshold { get; set; } = 80; // Default 80% threshold
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}