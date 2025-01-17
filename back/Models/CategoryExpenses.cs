namespace plusminus.Models
{
    public class CategoryExpenses
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;

        public virtual ICollection<Expenses> Expenses { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
