using backend.Models;

namespace backend.DTOs;

public class CreateSubscriptionDto
{
    public string Name { get; set; } = "";
    public decimal Cost { get; set; }
    public DateTime StartDate { get; set; }
    public BillingFrequency Frequency { get; set; }
}