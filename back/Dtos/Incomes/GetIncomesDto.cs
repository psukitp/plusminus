namespace plusminus.Dtos.Incomes
{
    public class GetIncomesDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateOnly Date { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryColor { get; set; }
        public decimal Amount { get; set; }
    }
}
