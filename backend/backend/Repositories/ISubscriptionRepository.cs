using backend.Models;

namespace backend.Repositories;

public interface ISubscriptionRepository
{
    Task<List<Subscription>> GetAllAsync(Guid userId);
    Task<Subscription?> GetByIdAsync(Guid id);
    Task AddAsync(Subscription subscription);
    Task UpdateAsync(Subscription subscription);
    Task DeleteAsync(Guid id);
}