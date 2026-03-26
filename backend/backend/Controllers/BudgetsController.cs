using backend.DTOs;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BudgetsController : ControllerBase
{
    private readonly BudgetService _budgetService;

    public BudgetsController(BudgetService budgetService)
    {
        _budgetService = budgetService;
    }

    [HttpGet]
    public async Task<IActionResult> GetBudgets()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();

        var budgets = await _budgetService.GetUserBudgetsAsync(Guid.Parse(userId));
        return Ok(budgets);
    }

    [HttpGet("status")]
    public async Task<IActionResult> GetBudgetStatuses()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();

        var statuses = await _budgetService.GetAllBudgetStatusesAsync(Guid.Parse(userId));
        return Ok(statuses);
    }

    [HttpPost]
    public async Task<IActionResult> CreateBudget(CreateBudgetDto dto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();

        var budget = new Budget
        {
            UserId = Guid.Parse(userId),
            CategoryId = dto.CategoryId,
            MonthlyLimit = dto.MonthlyLimit,
            AlertThreshold = dto.AlertThreshold
        };

        try
        {
            var created = await _budgetService.CreateBudgetAsync(budget);
            return CreatedAtAction(nameof(GetBudgets), new { id = created.Id }, created);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBudget(Guid id, UpdateBudgetDto dto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();

        var budget = new Budget
        {
            Id = id,
            UserId = Guid.Parse(userId),
            CategoryId = dto.CategoryId,
            MonthlyLimit = dto.MonthlyLimit,
            AlertThreshold = dto.AlertThreshold
        };

        try
        {
            var updated = await _budgetService.UpdateBudgetAsync(budget);
            return Ok(updated);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBudget(Guid id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();

        try
        {
            await _budgetService.DeleteBudgetAsync(id, Guid.Parse(userId));
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }
}