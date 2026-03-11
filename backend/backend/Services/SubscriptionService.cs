using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.JSInterop.Infrastructure;

namespace backend.Services;

public class SubscriptionService
{
    private readonly ISubscriptionRepository _repository;
    private readonly BillingService _billingService;

    public SubscriptionService(ISubscriptionRepository repository, BillingService billingService)
    {
        _repository = repository;
        _billingService = billingService;
    }
    
    public async Task<List<Subscription>> GetAllSubscriptions(Guid userId)
    {
        return await _repository.GetAllAsync(userId);
    }

    public async Task<Subscription> GetSubscription(Guid subscriptionId)
    {
        return await _repository.GetByIdAsync(subscriptionId);
    }
    
    public async Task AddSubscription(Guid userId, CreateSubscriptionDto dto)
    {
        var sub = new Subscription
        {
            UserId = userId,
            Name = dto.Name,
            Cost = dto.Cost,
            StartDate = dto.StartDate,
            Frequency = dto.Frequency
        };
        sub.RenewalDate = _billingService.CalculateNextBilling(sub.StartDate, sub.Frequency);
        await _repository.AddAsync(sub);
    }
    
    public async Task UpdateSubscription(Guid subId, UpdateSubscriptionDto sub)
    {
        var subToUpdate = await _repository.GetByIdAsync(subId);
        subToUpdate.Name = sub.Name;
        subToUpdate.Cost = sub.Cost;
        subToUpdate.StartDate = sub.StartDate;
        subToUpdate.Frequency = sub.Frequency;

        await _repository.UpdateAsync(subToUpdate);
    }
    
    public async Task DeleteSubscription(Guid id)
    {
        await _repository.DeleteAsync(id);
    }
    
    
}