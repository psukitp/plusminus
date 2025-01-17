namespace plusminus.Dtos.Incomes
{
    public class UpdateIncomesDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateOnly Date { get; set; }
        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
    }
}
