using backend.Models;
using backend.Repositories;

namespace backend.Services;

public class CategoryService
{
    private readonly ICategoryRepository _repository;

    public CategoryService(ICategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Category>> GetUserCategoriesAsync(Guid userId)
    {
        return await _repository.GetByUserIdAsync(userId);
    }

    public async Task<Category> CreateCategoryAsync(Category category)
    {
        if (string.IsNullOrWhiteSpace(category.Name))
            throw new ArgumentException("Category name is required");

        return await _repository.CreateAsync(category);
    }

    public async Task<Category> UpdateCategoryAsync(Category category)
    {
        var existing = await _repository.GetByIdAsync(category.Id, category.UserId);
        if (existing == null)
            throw new KeyNotFoundException("Category not found");

        existing.Name = category.Name;
        existing.Color = category.Color;

        return await _repository.UpdateAsync(existing);
    }

    public async Task DeleteCategoryAsync(Guid id, Guid userId)
    {
        var category = await _repository.GetByIdAsync(id, userId);
        if (category == null)
            throw new KeyNotFoundException("Category not found");

        await _repository.DeleteAsync(category);
    }
}