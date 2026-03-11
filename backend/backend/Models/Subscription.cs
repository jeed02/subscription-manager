using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Subscription
{
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; } = "";

    [Required]
    public decimal Cost { get; set; }

    public BillingFrequency Frequency { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime RenewalDate { get; set; }

    public required Guid UserId { get; set; }

    public User? User { get; set; }
}