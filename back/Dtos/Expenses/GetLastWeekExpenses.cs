namespace plusminus.Dtos.Expenses;

public class GetLastWeekExpenses
{
    public List<DateOnly> Days { get; set; }
    public List<decimal> Values { get; set; }
}