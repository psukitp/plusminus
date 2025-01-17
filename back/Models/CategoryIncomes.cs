namespace plusminus.Models
{
    public class CategoryIncomes
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int UserId { get; set; }
        public string Color { get; set; } = string.Empty;

        public virtual ICollection<Incomes> Incomes { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
