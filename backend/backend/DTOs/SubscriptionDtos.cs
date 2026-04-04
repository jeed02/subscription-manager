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
    public int DaysUntilRenewal { get; set; }
    public Guid UserId { get; set; }
    public Guid? CategoryId { get; set; }
    public CategoryResponseDto? Category { get; set; }
    public string? Description { get; set; }
}

public class DashboardTransactionsResponseDto
{
    public List<SubscriptionResponseDto> LatestTransactions { get; set; } = [];
    public List<SubscriptionResponseDto> UpcomingTransactions { get; set; } = [];
}

public class DashboardCategoryCountItemDto
{
    public Guid? CategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public int SubscriptionCount { get; set; }
}

public class DashboardCategoryBreakdownResponseDto
{
    public List<DashboardCategoryCountItemDto> Categories { get; set; } = [];
}

public class MonthlyExpensePointDto
{
    public int Year { get; set; }
    public int Month { get; set; }
    public string Label { get; set; } = string.Empty;
    public decimal Amount { get; set; }
}

public class DashboardMonthlyExpensesResponseDto
{
    public List<MonthlyExpensePointDto> MonthlyExpenses { get; set; } = [];
}

public class DashboardCategorySpendingItemDto
{
    public Guid? CategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public decimal Amount { get; set; }
}

public class DashboardSpendingBreakdownResponseDto
{
    public int Year { get; set; }
    public int Month { get; set; }
    public string Label { get; set; } = string.Empty;
    public List<DashboardCategorySpendingItemDto> Categories { get; set; } = [];
}

public class SubscriptionPriceHistoryItemDto
{
    public Guid Id { get; set; }
    public Guid SubscriptionId { get; set; }
    public decimal PreviousCost { get; set; }
    public decimal NewCost { get; set; }
    public DateTime ChangedAt { get; set; }
}

public class SubscriptionPriceHistoryResponseDto
{
    public List<SubscriptionPriceHistoryItemDto> History { get; set; } = [];
}
