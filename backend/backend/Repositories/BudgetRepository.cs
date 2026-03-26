using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public interface IBudgetRepository
{
    Task<IEnumerable<Budget>> GetByUserIdAsync(Guid userId);
    Task<Budget?> GetByIdAsync(Guid id, Guid userId);
    Task<Budget> CreateAsync(Budget budget);
    Task<Budget> UpdateAsync(Budget budget);
    Task DeleteAsync(Budget budget);
}

public class BudgetRepository : IBudgetRepository
{
    private readonly AppDbContext _context;

    public BudgetRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Budget>> GetByUserIdAsync(Guid userId)
    {
        return await _context.Budgets
            .Include(b => b.Category)
            .Where(b => b.UserId == userId)
            .OrderBy(b => b.CategoryId == null ? 0 : 1) // Overall budgets first
            .ThenBy(b => b.Category!.Name)
            .ToListAsync();
    }

    public async Task<Budget?> GetByIdAsync(Guid id, Guid userId)
    {
        return await _context.Budgets
            .Include(b => b.Category)
            .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);
    }

    public async Task<Budget> CreateAsync(Budget budget)
    {
        _context.Budgets.Add(budget);
        await _context.SaveChangesAsync();
        return budget;
    }

    public async Task<Budget> UpdateAsync(Budget budget)
    {
        budget.UpdatedAt = DateTime.UtcNow;
        _context.Budgets.Update(budget);
        await _context.SaveChangesAsync();
        return budget;
    }

    public async Task DeleteAsync(Budget budget)
    {
        _context.Budgets.Remove(budget);
        await _context.SaveChangesAsync();
    }
}