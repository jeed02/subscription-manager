using backend.Models;
using backend.Repositories;

namespace backend.Services;

public class UserPreferencesService
{
    private readonly IUserPreferencesRepository _repository;

    public UserPreferencesService(IUserPreferencesRepository repository)
    {
        _repository = repository;
    }

    public async Task<UserPreferences> GetOrCreatePreferencesAsync(Guid userId)
    {
        var preferences = await _repository.GetByUserIdAsync(userId);
        if (preferences == null)
        {
            preferences = new UserPreferences { UserId = userId };
            preferences = await _repository.CreateAsync(preferences);
        }
        return preferences;
    }

    public async Task<UserPreferences> UpdatePreferencesAsync(UserPreferences preferences)
    {
        return await _repository.UpdateAsync(preferences);
    }
}