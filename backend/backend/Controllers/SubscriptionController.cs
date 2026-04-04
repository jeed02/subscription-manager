using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using backend.DTOs;
using System.Security.Claims;
using backend.Extensions;
using backend.Services;
using backend.Repositories;
using System.Text;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SubscriptionController : ControllerBase
{
    private readonly SubscriptionService _subscriptionService;
    private readonly ISubscriptionRepository _subscriptionRepository;
    private readonly BillingService _billingService;

    
    public SubscriptionController(
        SubscriptionService subscriptionService,
        ISubscriptionRepository subscriptionRepository,
        BillingService billingService)
    {
        _subscriptionService = subscriptionService;
        _subscriptionRepository = subscriptionRepository;
        _billingService = billingService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllSubscriptions()
    {
        Guid userId = User.GetUserId();

        var subscriptions = await _subscriptionService.GetAllSubscriptions(userId);
        return Ok(subscriptions.Select(MapSubscriptionToDto));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetSubscriptionByIdAsync(Guid id)
    {
        Subscription? subscription = await _subscriptionService.GetSubscription(id);
        if (subscription == null)
        {
            return NotFound();
        }

        return Ok(MapSubscriptionToDto(subscription));
    }

    [HttpGet("dashboard-widgets")]
    public async Task<IActionResult> GetDashboardWidgets()
    {
        Guid userId = User.GetUserId();
        var response = await _subscriptionService.GetDashboardTransactions(userId);
        return Ok(response);
    }

    [HttpGet("dashboard-categories")]
    public async Task<IActionResult> GetDashboardCategories()
    {
        Guid userId = User.GetUserId();
        var response = await _subscriptionService.GetDashboardCategoryBreakdown(userId);
        return Ok(response);
    }

    [HttpGet("dashboard-monthly-expenses")]
    public async Task<IActionResult> GetDashboardMonthlyExpenses()
    {
        Guid userId = User.GetUserId();
        var response = await _subscriptionService.GetDashboardMonthlyExpenses(userId);
        return Ok(response);
    }

    [HttpGet("dashboard-spending-breakdown")]
    public async Task<IActionResult> GetDashboardSpendingBreakdown([FromQuery] int? year, [FromQuery] int? month)
    {
        Guid userId = User.GetUserId();

        try
        {
            var response = await _subscriptionService.GetDashboardSpendingBreakdown(userId, year, month);
            return Ok(response);
        }
        catch (ArgumentOutOfRangeException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("{id:guid}/price-history")]
    public async Task<IActionResult> GetSubscriptionPriceHistory(Guid id)
    {
        Guid userId = User.GetUserId();
        var response = await _subscriptionService.GetSubscriptionPriceHistory(id, userId);
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> CreateSubscription(CreateSubscriptionDto dto)
    {
        Guid userId = User.GetUserId();

        await _subscriptionService.AddSubscription(userId, dto);

        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSubscription(Guid id, UpdateSubscriptionDto subscription)
    {
        var subToUpdate = await _subscriptionService.GetSubscription(id);
        if (subToUpdate == null)
        {
            return NotFound();
        }
        await _subscriptionService.UpdateSubscription(id, subscription);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSubscription(Guid id)
    {
        await _subscriptionService.DeleteSubscription(id);
        return NoContent();
    }

    [HttpGet("export/csv")]
    public async Task<IActionResult> ExportSubscriptionsAsCsv()
    {
        Guid userId = User.GetUserId();

        var subscriptions = await _subscriptionRepository.GetAllAsync(userId);

        var csv = new StringBuilder();
        csv.AppendLine("Name,Cost,Frequency,StartDate,RenewalDate,Category");

        foreach (var sub in subscriptions)
        {
            var categoryName = sub.Category?.Name ?? "";
            var nextRenewalDate = _billingService.CalculateNextUpcomingRenewalDate(sub.RenewalDate, sub.Frequency);
            csv.AppendLine($"{EscapeCsvField(sub.Name)},{sub.Cost},{sub.Frequency},{sub.StartDate:yyyy-MM-dd},{nextRenewalDate:yyyy-MM-dd},{EscapeCsvField(categoryName)}");
        }

        var bytes = Encoding.UTF8.GetBytes(csv.ToString());
        return File(bytes, "text/csv", "subscriptions.csv");
    }

    private string EscapeCsvField(string field)
    {
        if (field.Contains(",") || field.Contains("\"") || field.Contains("\n"))
        {
            return $"\"{field.Replace("\"", "\"\"")}\"";
        }
        return field;
    }

    private SubscriptionResponseDto MapSubscriptionToDto(Subscription subscription)
    {
        var nextRenewalDate = _billingService.CalculateNextUpcomingRenewalDate(
            subscription.RenewalDate,
            subscription.Frequency
        );

        return new SubscriptionResponseDto
        {
            Id = subscription.Id,
            Name = subscription.Name,
            Cost = subscription.Cost,
            Frequency = subscription.Frequency,
            StartDate = subscription.StartDate,
            Description = subscription.Description,
            RenewalDate = nextRenewalDate,
            DaysUntilRenewal = _billingService.CalculateDaysUntilRenewal(subscription.RenewalDate, subscription.Frequency),
            UserId = subscription.UserId,
            CategoryId = subscription.CategoryId,
            Category = subscription.Category == null
                ? null
                : new CategoryResponseDto
                {
                    Id = subscription.Category.Id,
                    UserId = subscription.Category.UserId,
                    Name = subscription.Category.Name,
                    Color = subscription.Category.Color,
                    CreatedAt = subscription.Category.CreatedAt
                }
        };
    }
}