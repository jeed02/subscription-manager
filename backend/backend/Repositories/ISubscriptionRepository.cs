using backend.Models;
using backend.DTOs;

namespace backend.Repositories;

public interface ISubscriptionRepository
{
    Task<List<Subscription>> GetAllAsync(Guid userId);
    Task<List<Subscription>> GetAllOrderedByRenewalDateAsync(Guid userId, bool ascending);
    Task<List<DashboardCategoryCountItemDto>> GetDashboardCategoryCountsAsync(Guid userId);
    Task<List<Subscription>> GetByUserIdAsync(Guid userId);
    Task<Subscription?> GetByIdAsync(Guid id);
    Task<List<SubscriptionPriceHistory>> GetPriceHistoryAsync(Guid subscriptionId, Guid userId);
    Task AddAsync(Subscription subscription);
    Task AddPriceHistoryAsync(SubscriptionPriceHistory history);
    Task UpdateAsync(Subscription subscription);
    Task DeleteAsync(Guid id);
}