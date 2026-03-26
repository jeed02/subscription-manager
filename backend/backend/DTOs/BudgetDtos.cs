namespace backend.DTOs;

public class CreateBudgetDto
{
    public Guid? CategoryId { get; set; }
    public decimal MonthlyLimit { get; set; }
    public decimal AlertThreshold { get; set; } = 80;
}

public class UpdateBudgetDto
{
    public Guid? CategoryId { get; set; }
    public decimal MonthlyLimit { get; set; }
    public decimal AlertThreshold { get; set; } = 80;
}