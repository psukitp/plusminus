using AutoMapper;
using Microsoft.EntityFrameworkCore;
using plusminus.Data;
using plusminus.Dtos.UserSettings;
using plusminus.Models;

namespace plusminus.Services.UserSettingsService;

public class UserSettingsService : IUserSettingsService
{
    private readonly IMapper _mapper;
    private readonly DataContext _context;
    private readonly string _defaultCurrency = "rub";
    private readonly string _defaultTheme = "light";
    private readonly string _defaultLocale = "ru";

    public UserSettingsService(IMapper mapper, DataContext context)
    {
        _mapper = mapper;
        _context = context;
    }
    
    public async Task<ServiceResponse<GetUserSettings>> UpdateSettings(UpdateUserSettings settings, int userId)
    {
        var serviceResponse = new ServiceResponse<GetUserSettings>();
        try
        {
            var dbSettings = await _context.UserSettings.ToListAsync();
                var currentSettingsList = dbSettings.Where(us => us.UserId == userId).ToList();
            if (currentSettingsList.Any())
            {
                var currentSettings = currentSettingsList.First();
                if (settings.Currency != null) currentSettings.Currency = settings.Currency;
                if (settings.Locale != null) currentSettings.Locale = settings.Locale;
                if (settings.Theme != null) currentSettings.Theme = settings.Theme;
                await _context.SaveChangesAsync();

                serviceResponse.Data = _mapper.Map<GetUserSettings>(currentSettings);
            }
            else
            {
                var newSettings = await _context.UserSettings.AddAsync(new UserSettings()
                {
                    UserId = userId,
                    Currency = settings?.Currency ?? _defaultCurrency,
                    Locale = settings?.Locale ?? _defaultLocale,
                    Theme = settings?.Theme ?? _defaultTheme
                });

                await _context.SaveChangesAsync();

                serviceResponse.Data = _mapper.Map<GetUserSettings>(newSettings.Entity);
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