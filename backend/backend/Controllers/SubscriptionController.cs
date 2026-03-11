using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using backend.DTOs;
using System.Security.Claims;
using backend.Extensions;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SubscriptionController : ControllerBase
{
    private readonly SubscriptionService _subscriptionService;

    
    public SubscriptionController(SubscriptionService subscriptionService)
    {
        _subscriptionService = subscriptionService;

    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllSubscriptions()
    {
        Guid userId = User.GetUserId();

        var subscriptions = await _subscriptionService.GetAllSubscriptions(userId);

        return Ok(subscriptions);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSubscriptionByIdAsync(Guid id)
    {
        Subscription subscription = await _subscriptionService.GetSubscription(id);
        if (subscription == null)
        {
            return NotFound();
        }
        return Ok(subscription);
    }

    [HttpPost]
    public async Task<IActionResult> CreateSubscription(CreateSubscriptionDto dto)
    {
        Guid userId = User.GetUserId();

        await _subscriptionService.AddSubscription(userId, dto);

        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSubscription(Guid id, UpdateSubscriptionDto subscription)
    {
        var subToUpdate = await _subscriptionService.GetSubscription(id);
        if (subToUpdate == null)
        {
            return NotFound();
        }
        await _subscriptionService.UpdateSubscription(id, subscription);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSubscription(Guid id)
    {
        await _subscriptionService.DeleteSubscription(id);
        return NoContent();
    }
    

}