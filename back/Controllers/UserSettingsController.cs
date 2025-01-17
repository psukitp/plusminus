using Microsoft.AspNetCore.Mvc;
using plusminus.Dtos.UserSettings;
using plusminus.Models;
using plusminus.Services.UserSettingsService;
using AuthorizeFilter = plusminus.Middlewares.AuthorizeFilter;

namespace plusminus.Controllers;

[ServiceFilter(typeof(AuthorizeFilter))]
[ApiController]
[Route("api/[controller]")]
public class UserSettingsController : ControllerBase
{
    private readonly IUserSettingsService _userSettingsService;

    public UserSettingsController(IUserSettingsService userSettingsService)
    {
        _userSettingsService = userSettingsService;
    }

    [HttpPatch("update")]
    public async Task<ActionResult<ServiceResponse<GetUserSettings>>> UpdateUserSettings(UpdateUserSettings settings)
    {
        var userId = (int)HttpContext.Items["UserId"]!;
        return Ok(await _userSettingsService.UpdateSettings(settings, userId));
    }
}