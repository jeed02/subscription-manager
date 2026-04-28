using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public interface INotificationRepository
{
    Task<List<Guid>> GetDismissedSubscriptionIdsAsync(Guid userId, DateTime renewalDate);
    Task DismissAsync(Guid userId, Guid subscriptionId, DateTime renewalDate);
}

public class NotificationRepository : INotificationRepository
{
    private readonly AppDbContext _context;

    public NotificationRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Guid>> GetDismissedSubscriptionIdsAsync(Guid userId, DateTime renewalDate)
    {
        return await _context.DismissedNotifications
            .Where(d => d.UserId == userId && d.RenewalDate.Date == renewalDate.Date)
            .Select(d => d.SubscriptionId)
            .ToListAsync();
    }

    public async Task DismissAsync(Guid userId, Guid subscriptionId, DateTime renewalDate)
    {
        bool alreadyDismissed = await _context.DismissedNotifications.AnyAsync(d =>
            d.UserId == userId &&
            d.SubscriptionId == subscriptionId &&
            d.RenewalDate.Date == renewalDate.Date);

        if (!alreadyDismissed)
        {
            _context.DismissedNotifications.Add(new DismissedNotification
            {
                UserId = userId,
                SubscriptionId = subscriptionId,
                RenewalDate = renewalDate.Date,
                DismissedAt = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();
        }
    }
}
