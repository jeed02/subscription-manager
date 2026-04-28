namespace backend.Models;

public class DismissedNotification
{
    public Guid Id { get; set; }

    public required Guid UserId { get; set; }
    public User? User { get; set; }

    public required Guid SubscriptionId { get; set; }
    public Subscription? Subscription { get; set; }

    /// <summary>
    /// The renewal date for which this notification was dismissed.
    /// </summary>
    public DateTime RenewalDate { get; set; }

    public DateTime DismissedAt { get; set; } = DateTime.UtcNow;
}
