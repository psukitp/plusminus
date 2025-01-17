namespace plusminus.Dtos.Expenses
{
    public class UpdateExpensesDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateOnly Date { get; set; }
        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
    }
}
