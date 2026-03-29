using backend.DTOs;
using backend.Models;
using backend.Repositories;

namespace backend.Services;

public class SubscriptionService
{
    private readonly ISubscriptionRepository _repository;
    private readonly BillingService _billingService;

    public SubscriptionService(ISubscriptionRepository repository, BillingService billingService)
    {
        _repository = repository;
        _billingService = billingService;
    }
    
    public async Task<List<Subscription>> GetAllSubscriptions(Guid userId)
    {
        return await _repository.GetAllAsync(userId);
    }

    public async Task<Subscription?> GetSubscription(Guid subscriptionId)
    {
        return await _repository.GetByIdAsync(subscriptionId);
    }
    
    public async Task AddSubscription(Guid userId, CreateSubscriptionDto dto)
    {
        var sub = new Subscription
        {
            UserId = userId,
            Name = dto.Name,
            Cost = dto.Cost,
            StartDate = dto.StartDate,
            Frequency = dto.Frequency,
            CategoryId = dto.CategoryId
        };
        sub.RenewalDate = _billingService.CalculateNextBilling(sub.StartDate, sub.Frequency);
        await _repository.AddAsync(sub);
    }
    
    public async Task UpdateSubscription(Guid subId, UpdateSubscriptionDto sub)
    {
        var subToUpdate = await _repository.GetByIdAsync(subId);
        if (subToUpdate == null)
        {
            return;
        }

        subToUpdate.Name = sub.Name;
        subToUpdate.Cost = sub.Cost;
        subToUpdate.StartDate = sub.StartDate;
        subToUpdate.Frequency = sub.Frequency;
        subToUpdate.CategoryId = sub.CategoryId;

        await _repository.UpdateAsync(subToUpdate);
    }
    
    public async Task DeleteSubscription(Guid id)
    {
        await _repository.DeleteAsync(id);
    }

    public async Task<DashboardTransactionsResponseDto> GetDashboardTransactions(Guid userId)
    {
        var ascending = await _repository.GetAllOrderedByRenewalDateAsync(userId, true);
        var descending = await _repository.GetAllOrderedByRenewalDateAsync(userId, false);

        var upcoming = ascending
            .Select(MapToDto)
            .OrderBy(s => s.DaysUntilRenewal)
            .ThenBy(s => s.Name)
            .Take(5)
            .ToList();

        var latest = descending
            .Select(MapToDto)
            .OrderByDescending(s => s.DaysUntilRenewal)
            .ThenBy(s => s.Name)
            .Take(5)
            .ToList();

        return new DashboardTransactionsResponseDto
        {
            LatestTransactions = latest,
            UpcomingTransactions = upcoming
        };
    }

    public async Task<DashboardCategoryBreakdownResponseDto> GetDashboardCategoryBreakdown(Guid userId)
    {
        var categories = await _repository.GetDashboardCategoryCountsAsync(userId);

        return new DashboardCategoryBreakdownResponseDto
        {
            Categories = categories
                .Where(category => category.SubscriptionCount > 0)
                .OrderByDescending(category => category.SubscriptionCount)
                .ThenBy(category => category.Name, StringComparer.OrdinalIgnoreCase)
                .ToList()
        };
    }

    private SubscriptionResponseDto MapToDto(Subscription subscription)
    {
        return new SubscriptionResponseDto
        {
            Id = subscription.Id,
            Name = subscription.Name,
            Cost = subscription.Cost,
            Frequency = subscription.Frequency,
            StartDate = subscription.StartDate,
            RenewalDate = subscription.RenewalDate,
            DaysUntilRenewal = _billingService.CalculateDaysUntilRenewal(subscription.RenewalDate),
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