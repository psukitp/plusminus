using AutoMapper;
using plusminus.Dtos.UserSettings;
using plusminus.Models;
using plusminus.Repository;

namespace plusminus.Services;

public class UserSettingsService
{
    private readonly IMapper _mapper;
    private readonly IRepository<UserSettings> _repository;
    private readonly HttpContextAccessorService _httpContextAccessor;
    
    private readonly string _defaultCurrency = "rub";
    private readonly string _defaultTheme = "light";
    private readonly string _defaultLocale = "ru";

    public UserSettingsService(IMapper mapper, IRepository<UserSettings> repository, HttpContextAccessorService httpContextAccessor)
    {
        _mapper = mapper;
        _repository = repository;
        _httpContextAccessor = httpContextAccessor;
    }
    
    /// <summary>
    /// Обновить настройки.
    /// </summary>
    /// <param name="settings">Настройки.</param>
    /// <param name="cancellationToken">CancellationToken.</param>
    /// <returns>Информация о настройках пользователя.</returns>
    public async Task<ServiceResponse<GetUserSettings>> UpdateSettings(UpdateUserSettings settings, CancellationToken cancellationToken)
    {
        var serviceResponse = new ServiceResponse<GetUserSettings>();
        try
        {
            var userId = _httpContextAccessor.GetUserId();
            var entity = _repository.GetAll().FirstOrDefault(us => us.UserId == userId);
            if (entity != null)
            {
                if (settings.Currency != null) entity.Currency = settings.Currency;
                if (settings.Locale != null) entity.Locale = settings.Locale;
                if (settings.Theme != null) entity.Theme = settings.Theme;

                var updatedSettings = await _repository.Update(entity, cancellationToken);

                serviceResponse.Data = _mapper.Map<GetUserSettings>(updatedSettings);
            }
            else
            {
                var newSettings = new UserSettings()
                {
                    UserId = userId,
                    Currency = settings?.Currency ?? _defaultCurrency,
                    Locale = settings?.Locale ?? _defaultLocale,
                    Theme = settings?.Theme ?? _defaultTheme
                };

                var addedSettings = _repository.Add(newSettings, cancellationToken);
                serviceResponse.Data = _mapper.Map<GetUserSettings>(addedSettings);
            }
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }

        return serviceResponse;
    }
}