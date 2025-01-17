namespace plusminus.Dtos.Incomes;

public class GetIncomesByPeriod
{
    public List<DateOnly> Days { get; set; }
    public List<decimal> Values { get; set; }
}