namespace backend.DTOs;

using backend.Models;

public class SubscriptionResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Cost { get; set; }
    public BillingFrequency Frequency { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime RenewalDate { get; set; }
    public Guid UserId { get; set; }
    public Guid? CategoryId { get; set; }
    public CategoryResponseDto? Category { get; set; }
}
