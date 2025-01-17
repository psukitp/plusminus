using plusminus.Dtos.UserSettings;
using plusminus.Models;

namespace plusminus.Services.UserSettingsService;

public interface IUserSettingsService
{
    Task<ServiceResponse<GetUserSettings>> UpdateSettings(UpdateUserSettings settings, int userId);
}