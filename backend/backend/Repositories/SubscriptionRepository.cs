using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class SubscriptionRepository :ISubscriptionRepository
{
    private readonly AppDbContext _context;
    
    public SubscriptionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Subscription>> GetAllAsync(Guid userId)
    {
        return await _context.Subscriptions
            .Where(s => s.UserId == userId)
            .ToListAsync();
    }

    public async Task<Subscription?> GetByIdAsync(Guid id)
    {
        return await _context.Subscriptions
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task AddAsync(Subscription subscription)
    {
        _context.Subscriptions.Add(subscription);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Subscription subscription)
    {
        _context.Subscriptions.Update(subscription);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        Subscription sub = GetByIdAsync(id).Result;

        if (sub == null)
        {
            return;
        }
        _context.Subscriptions.Remove(sub);
        await _context.SaveChangesAsync();
    }
}