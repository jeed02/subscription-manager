using backend.DTOs;
using backend.Repositories;

namespace backend.Services;

public class NotificationService
{
    private readonly INotificationRepository _notificationRepository;
    private readonly ISubscriptionRepository _subscriptionRepository;

    public NotificationService(
        INotificationRepository notificationRepository,
        ISubscriptionRepository subscriptionRepository)
    {
        _notificationRepository = notificationRepository;
        _subscriptionRepository = subscriptionRepository;
    }

    public async Task<List<NotificationDto>> GetPendingNotificationsAsync(Guid userId)
    {
        DateTime tomorrow = DateTime.UtcNow.Date.AddDays(1);

        var allSubscriptions = await _subscriptionRepository.GetAllAsync(userId);

        var renewingTomorrow = allSubscriptions
            .Where(s => s.RenewalDate.Date == tomorrow)
            .ToList();

        if (renewingTomorrow.Count == 0)
            return [];

        var dismissedIds = await _notificationRepository.GetDismissedSubscriptionIdsAsync(userId, tomorrow);

        return renewingTomorrow
            .Where(s => !dismissedIds.Contains(s.Id))
            .Select(s => new NotificationDto(s.Id, s.Name, s.Cost, s.RenewalDate))
            .ToList();
    }

    public async Task DismissNotificationAsync(Guid userId, Guid subscriptionId)
    {
        var subscription = await _subscriptionRepository.GetByIdAsync(subscriptionId);
        if (subscription == null || subscription.UserId != userId)
            return;

        await _notificationRepository.DismissAsync(userId, subscriptionId, subscription.RenewalDate.Date);
    }
}
