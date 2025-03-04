using Microsoft.AspNetCore.Mvc;
using plusminus.Dtos.UserSettings;
using plusminus.Models;
using plusminus.Services;
using AuthorizeFilter = plusminus.Middlewares.AuthorizeFilter;

namespace plusminus.Controllers;

[ServiceFilter(typeof(AuthorizeFilter))]
[ApiController]
[Route("api/[controller]")]
public class UserSettingsController : ControllerBase
{
    private readonly UserSettingsService _userSettingsService;

    public UserSettingsController(UserSettingsService userSettingsService)
    {
        _userSettingsService = userSettingsService;
    }

    [HttpPatch]
    public async Task<ActionResult<ServiceResponse<GetUserSettings>>> UpdateUserSettings(UpdateUserSettings settings, CancellationToken cancellationToken)
    {
        return Ok(await _userSettingsService.UpdateSettings(settings, cancellationToken));
    }
}