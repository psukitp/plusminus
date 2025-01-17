namespace plusminus.Dtos.Users
{
    public class UsersRegisterRequest
    {
        public string Name { get; set; } = string.Empty;
        public string SecondName { get; set; } = string.Empty;
        public string Login { get; set; } = string.Empty;
        public string? Phone { get; set; } = string.Empty;
        public bool BaseCategories { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
