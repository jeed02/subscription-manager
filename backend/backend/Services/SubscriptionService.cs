using backend.DTOs;
using backend.Models;
using backend.Repositories;
using System.Globalization;

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
            CategoryId = dto.CategoryId,
            UpdatedAt = DateTime.UtcNow
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

        decimal previousCost = subToUpdate.Cost;

        subToUpdate.Name = sub.Name;
        subToUpdate.Cost = sub.Cost;
        subToUpdate.StartDate = sub.StartDate;
        subToUpdate.Frequency = sub.Frequency;
        subToUpdate.CategoryId = sub.CategoryId;
        subToUpdate.UpdatedAt = DateTime.UtcNow;

        await _repository.UpdateAsync(subToUpdate);

        if (previousCost != sub.Cost)
        {
            var history = new SubscriptionPriceHistory
            {
                SubscriptionId = subToUpdate.Id,
                PreviousCost = previousCost,
                NewCost = sub.Cost,
                ChangedAt = DateTime.UtcNow
            };

            await _repository.AddPriceHistoryAsync(history);
        }
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

    public async Task<DashboardMonthlyExpensesResponseDto> GetDashboardMonthlyExpenses(Guid userId)
    {
        var subscriptions = await _repository.GetByUserIdAsync(userId);
        var now = DateTime.UtcNow;
        var startMonth = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc).AddMonths(-11);

        var monthlyExpenses = Enumerable.Range(0, 12)
            .Select(offset =>
            {
                var monthDate = startMonth.AddMonths(offset);
                var monthEnd = monthDate.AddMonths(1).AddTicks(-1);

                return new MonthlyExpensePointDto
                {
                    Year = monthDate.Year,
                    Month = monthDate.Month,
                    Label = monthDate.ToString("MMM", CultureInfo.InvariantCulture),
                    Amount = subscriptions
                        .Where(sub => sub.StartDate <= monthEnd)
                        .Sum(sub => NormalizeMonthlyCost(sub.Cost, sub.Frequency))
                };
            })
            .ToList();

        return new DashboardMonthlyExpensesResponseDto
        {
            MonthlyExpenses = monthlyExpenses
        };
    }

    public async Task<DashboardSpendingBreakdownResponseDto> GetDashboardSpendingBreakdown(Guid userId, int? year, int? month)
    {
        var currentMonthStart = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1, 0, 0, 0, DateTimeKind.Utc);
        var earliestMonthStart = currentMonthStart.AddMonths(-11);

        var selectedYear = year ?? currentMonthStart.Year;
        var selectedMonth = month ?? currentMonthStart.Month;

        if (selectedMonth < 1 || selectedMonth > 12)
        {
            throw new ArgumentOutOfRangeException(nameof(month), "Month must be between 1 and 12.");
        }

        DateTime selectedMonthStart;
        try
        {
            selectedMonthStart = new DateTime(selectedYear, selectedMonth, 1, 0, 0, 0, DateTimeKind.Utc);
        }
        catch (ArgumentOutOfRangeException)
        {
            throw new ArgumentOutOfRangeException(nameof(year), "Year/month combination is invalid.");
        }

        if (selectedMonthStart < earliestMonthStart || selectedMonthStart > currentMonthStart)
        {
            throw new ArgumentOutOfRangeException(nameof(month), "Requested month must be within the last 12 months.");
        }

        var selectedMonthEnd = selectedMonthStart.AddMonths(1).AddTicks(-1);
        var subscriptions = await _repository.GetByUserIdAsync(userId);

        var categories = subscriptions
            .Where(subscription => subscription.StartDate <= selectedMonthEnd)
            .GroupBy(subscription => new
            {
                subscription.CategoryId,
                Name = subscription.Category != null ? subscription.Category.Name : "Uncategorized",
                Color = subscription.Category != null ? subscription.Category.Color : "#6B7280"
            })
            .Select(group => new DashboardCategorySpendingItemDto
            {
                CategoryId = group.Key.CategoryId,
                Name = group.Key.Name,
                Color = group.Key.Color,
                Amount = group.Sum(subscription => NormalizeMonthlyCost(subscription.Cost, subscription.Frequency))
            })
            .Where(item => item.Amount > 0)
            .OrderByDescending(item => item.Amount)
            .ThenBy(item => item.Name, StringComparer.OrdinalIgnoreCase)
            .ToList();

        return new DashboardSpendingBreakdownResponseDto
        {
            Year = selectedMonthStart.Year,
            Month = selectedMonthStart.Month,
            Label = selectedMonthStart.ToString("MMM yyyy", CultureInfo.InvariantCulture),
            Categories = categories
        };
    }

    public async Task<SubscriptionPriceHistoryResponseDto> GetSubscriptionPriceHistory(Guid subscriptionId, Guid userId)
    {
        var history = await _repository.GetPriceHistoryAsync(subscriptionId, userId);

        return new SubscriptionPriceHistoryResponseDto
        {
            History = history.Select(item => new SubscriptionPriceHistoryItemDto
            {
                Id = item.Id,
                SubscriptionId = item.SubscriptionId,
                PreviousCost = item.PreviousCost,
                NewCost = item.NewCost,
                ChangedAt = item.ChangedAt
            }).ToList()
        };
    }

    private decimal NormalizeMonthlyCost(decimal cost, BillingFrequency frequency)
    {
        return frequency switch
        {
            BillingFrequency.Monthly => cost,
            BillingFrequency.Quarterly => cost / 3,
            BillingFrequency.Yearly => cost / 12,
            _ => cost
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