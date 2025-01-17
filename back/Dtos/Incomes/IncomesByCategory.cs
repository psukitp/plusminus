namespace plusminus.Dtos.Incomes;

public class IncomesByCategory
{
    public int Id { get; set; }
    public string CategoryName { get; set; } = null!;
    public decimal Amount { get; set; }
    public string Color { get; set; } = null!;
}