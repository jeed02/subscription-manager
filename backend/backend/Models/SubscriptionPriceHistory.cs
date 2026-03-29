namespace backend.Models;

public class SubscriptionPriceHistory
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid SubscriptionId { get; set; }
    public Subscription? Subscription { get; set; }
    public decimal PreviousCost { get; set; }
    public decimal NewCost { get; set; }
    public DateTime ChangedAt { get; set; } = DateTime.UtcNow;
}
