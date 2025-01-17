namespace plusminus.Dtos.Expenses;

public class GetThisYearExpenses
{
    public List<string> Monthes { get; set; }
    public List<decimal> Values { get; set; }
}