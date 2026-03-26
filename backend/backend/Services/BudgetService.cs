using backend.Models;
using backend.Repositories;

namespace backend.Services;

public class BudgetService
{
    private readonly IBudgetRepository _budgetRepository;
    private readonly ISubscriptionRepository _subscriptionRepository;

    public BudgetService(IBudgetRepository budgetRepository, ISubscriptionRepository subscriptionRepository)
    {
        _budgetRepository = budgetRepository;
        _subscriptionRepository = subscriptionRepository;
    }

    public async Task<IEnumerable<Budget>> GetUserBudgetsAsync(Guid userId)
    {
        return await _budgetRepository.GetByUserIdAsync(userId);
    }

    public async Task<Budget> CreateBudgetAsync(Budget budget)
    {
        if (budget.MonthlyLimit <= 0)
            throw new ArgumentException("Monthly limit must be greater than 0");

        return await _budgetRepository.CreateAsync(budget);
    }

    public async Task<Budget> UpdateBudgetAsync(Budget budget)
    {
        var existing = await _budgetRepository.GetByIdAsync(budget.Id, budget.UserId);
        if (existing == null)
            throw new KeyNotFoundException("Budget not found");

        existing.MonthlyLimit = budget.MonthlyLimit;
        existing.AlertThreshold = budget.AlertThreshold;
        existing.CategoryId = budget.CategoryId;

        return await _budgetRepository.UpdateAsync(existing);
    }

    public async Task DeleteBudgetAsync(Guid id, Guid userId)
    {
        var budget = await _budgetRepository.GetByIdAsync(id, userId);
        if (budget == null)
            throw new KeyNotFoundException("Budget not found");

        await _budgetRepository.DeleteAsync(budget);
    }

    public async Task<decimal> CalculateMonthlySpendingAsync(Guid userId, Guid? categoryId = null)
    {
        var subscriptions = await _subscriptionRepository.GetByUserIdAsync(userId);

        if (categoryId.HasValue)
        {
            subscriptions = subscriptions.Where(s => s.CategoryId == categoryId.Value).ToList();
        }

        // Calculate monthly spending based on billing frequency
        decimal totalMonthly = 0;
        foreach (var subscription in subscriptions)
        {
            totalMonthly += subscription.Frequency switch
            {
                BillingFrequency.Monthly => subscription.Cost,
                BillingFrequency.Quarterly => subscription.Cost / 3,
                BillingFrequency.Yearly => subscription.Cost / 12,
                _ => subscription.Cost // Default to monthly
            };
        }

        return totalMonthly;
    }

    public async Task<BudgetStatus> GetBudgetStatusAsync(Budget budget)
    {
        var spending = await CalculateMonthlySpendingAsync(budget.UserId, budget.CategoryId);
        var percentage = budget.MonthlyLimit > 0 ? (spending / budget.MonthlyLimit) * 100 : 0;
        var isOverThreshold = percentage >= budget.AlertThreshold;

        return new BudgetStatus
        {
            Budget = budget,
            CurrentSpending = spending,
            PercentageUsed = percentage,
            IsOverThreshold = isOverThreshold
        };
    }

    public async Task<IEnumerable<BudgetStatus>> GetAllBudgetStatusesAsync(Guid userId)
    {
        var budgets = await _budgetRepository.GetByUserIdAsync(userId);
        var statuses = new List<BudgetStatus>();

        foreach (var budget in budgets)
        {
            var status = await GetBudgetStatusAsync(budget);
            statuses.Add(status);
        }

        return statuses;
    }
}

public class BudgetStatus
{
    public required Budget Budget { get; set; }
    public decimal CurrentSpending { get; set; }
    public decimal PercentageUsed { get; set; }
    public bool IsOverThreshold { get; set; }
}