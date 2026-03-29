using backend.Data;
using backend.DTOs;
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
            .Include(s => s.Category)
            .OrderBy(s => s.StartDate)
            .ToListAsync();
    }

    public async Task<List<Subscription>> GetByUserIdAsync(Guid userId)
    {
        return await GetAllAsync(userId);
    }

    public async Task<List<DashboardCategoryCountItemDto>> GetDashboardCategoryCountsAsync(Guid userId)
    {
        return await _context.Subscriptions
            .Where(s => s.UserId == userId)
            .Select(s => new
            {
                s.CategoryId,
                CategoryName = s.Category != null ? s.Category.Name : "Uncategorized",
                CategoryColor = s.Category != null ? s.Category.Color : "#6B7280"
            })
            .GroupBy(s => new { s.CategoryId, s.CategoryName, s.CategoryColor })
            .Select(group => new DashboardCategoryCountItemDto
            {
                CategoryId = group.Key.CategoryId,
                Name = group.Key.CategoryName,
                Color = group.Key.CategoryColor,
                SubscriptionCount = group.Count()
            })
            .ToListAsync();
    }

    public async Task<List<Subscription>> GetAllOrderedByRenewalDateAsync(Guid userId, bool ascending)
    {
        IQueryable<Subscription> query = _context.Subscriptions
            .Where(s => s.UserId == userId)
            .Include(s => s.Category);

        query = ascending
            ? query.OrderBy(s => s.RenewalDate)
            : query.OrderByDescending(s => s.RenewalDate);

        return await query.ToListAsync();
    }

    public async Task<Subscription?> GetByIdAsync(Guid id)
    {
        return await _context.Subscriptions
            .Include(s => s.Category)
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
        Subscription? sub = await GetByIdAsync(id);

        if (sub == null)
        {
            return;
        }
        _context.Subscriptions.Remove(sub);
        await _context.SaveChangesAsync();
    }
}