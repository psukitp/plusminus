namespace plusminus.Models
{
    public class Expenses
    {
        public int Id { get; set; }
        public int UserId{ get; set; }
        public DateOnly Date { get; set; }
        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
        public virtual CategoryExpenses Category { get; set; } = null!;
        public virtual User User{ get; set; } = null!;
    }
}
