namespace plusminus.Dtos.Users
{
    public class UsersRegisterResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string SecondName { get; set; } = string.Empty;
        public string Login { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
