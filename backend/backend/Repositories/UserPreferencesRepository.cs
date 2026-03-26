using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public interface IUserPreferencesRepository
{
    Task<UserPreferences?> GetByUserIdAsync(Guid userId);
    Task<UserPreferences> CreateAsync(UserPreferences preferences);
    Task<UserPreferences> UpdateAsync(UserPreferences preferences);
}

public class UserPreferencesRepository : IUserPreferencesRepository
{
    private readonly AppDbContext _context;

    public UserPreferencesRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<UserPreferences?> GetByUserIdAsync(Guid userId)
    {
        return await _context.UserPreferences
            .FirstOrDefaultAsync(up => up.UserId == userId);
    }

    public async Task<UserPreferences> CreateAsync(UserPreferences preferences)
    {
        _context.UserPreferences.Add(preferences);
        await _context.SaveChangesAsync();
        return preferences;
    }

    public async Task<UserPreferences> UpdateAsync(UserPreferences preferences)
    {
        preferences.UpdatedAt = DateTime.UtcNow;
        _context.UserPreferences.Update(preferences);
        await _context.SaveChangesAsync();
        return preferences;
    }
}