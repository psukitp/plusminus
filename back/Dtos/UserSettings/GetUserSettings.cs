namespace plusminus.Dtos.UserSettings;

public class GetUserSettings
{
    public string Locale { get; set; } = "en";
    public string Theme { get; set; } = "light";
    public string Currency { get; set; } = null!;
}