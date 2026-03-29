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
    Task AddAsync(Subscription subscription);
    Task UpdateAsync(Subscription subscription);
    Task DeleteAsync(Guid id);
}