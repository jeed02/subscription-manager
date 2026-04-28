using backend.Extensions;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NotificationsController : ControllerBase
{
    private readonly NotificationService _notificationService;

    public NotificationsController(NotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    [HttpGet]
    public async Task<IActionResult> GetNotifications()
    {
        Guid userId = User.GetUserId();
        var notifications = await _notificationService.GetPendingNotificationsAsync(userId);
        return Ok(notifications);
    }

    [HttpPost("dismiss/{subscriptionId:guid}")]
    public async Task<IActionResult> DismissNotification(Guid subscriptionId)
    {
        Guid userId = User.GetUserId();
        await _notificationService.DismissNotificationAsync(userId, subscriptionId);
        return NoContent();
    }
}
