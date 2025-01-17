namespace plusminus.Dtos.Expenses
{
    public class GetExpensesDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateOnly Date { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = null!;
        public string CategoryColor { get; set; } = null!;
        public decimal Amount { get; set; }
    }
}
