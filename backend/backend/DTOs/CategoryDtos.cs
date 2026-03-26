namespace backend.DTOs;

public class CreateCategoryDto
{
    public string Name { get; set; } = string.Empty;
    public string Color { get; set; } = "#3B82F6";
}

public class UpdateCategoryDto
{
    public string Name { get; set; } = string.Empty;
    public string Color { get; set; } = "#3B82F6";
}