namespace plusminus.Dtos.Incomes
{
    public class AddIncomesDto
    {
        public DateOnly Date { get; set; }
        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
    }
}
