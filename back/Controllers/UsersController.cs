using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using plusminus.Dtos.Users;
using plusminus.Models;
using plusminus.Services.UsersService;
using System.Security.Claims;

namespace plusminus.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UsersController(IUsersService usersService, IHttpContextAccessor httpContextAccessor)
        {
            _usersService = usersService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("register")]
        public async Task<ActionResult<ServiceResponse<UsersRegisterResponse>>> Register(UsersRegisterRequest user)
        {
            var response = await _usersService.Register(user);

            if (response.Success && response.Data != null)
            {
                var userClaims = new List<Claim>
                {
                    new Claim("id", response.Data.Id.ToString()),
                };

                var claimsIdentity = new ClaimsIdentity(userClaims, CookieAuthenticationDefaults.AuthenticationScheme);

                var authProperties = new AuthenticationProperties
                {
                    ExpiresUtc = DateTimeOffset.UtcNow.AddDays(14),
                    IsPersistent = true
                };

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);
            }

            return Ok(response);
        }

        [HttpPost("auth")]
        public async Task<ActionResult<ServiceResponse<UsersAuthenticateResponse>>> Authenticate(UsersAuthenticateRequest user)
        {
            var response = await _usersService.Authenticate(user);
            if (response.Success && response.Data != null)
            {
                var userClaims = new List<Claim>
                {
                    new("id", response.Data.Id.ToString()),
                };

                var claimsIdentity = new ClaimsIdentity(userClaims, CookieAuthenticationDefaults.AuthenticationScheme);

                var authProperties = new AuthenticationProperties
                {
                    ExpiresUtc = DateTimeOffset.UtcNow.AddDays(14),
                    IsPersistent = true
                };

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);
            }
            return Ok(response);
        }

        [HttpPost("check")]
        public async Task<ActionResult<ServiceResponse<UsersAuthenticateResponse>>> CheckAuth()
        {
            var authenticateResult = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            if (!int.TryParse(authenticateResult.Principal.FindFirstValue("id"), out int userId))
            {
                return BadRequest("Неверный идентификатор пользователя.");
            }

            return Ok(await _usersService.CheckAuth(userId));
        }

        [HttpPost("logout")]
        public async Task Logout()
        { 
            await HttpContext.SignOutAsync();
        }
        
        [HttpPost("getRestoreCode")]
        public async Task<ActionResult<ServiceResponse<dynamic>>> GetRestoreCode(RestoreRequest data)
        {
            return Ok(await _usersService.GetRestoreCode(data.Email));
        }
        
        [HttpPost("applyCode")]
        public async Task<ActionResult<ServiceResponse<dynamic>>> ApplyRestoreCode(ApplyRestoreRequest data)
        {
            return Ok(await _usersService.ApplyRestoreCode(data.Code));
        }
        
        [HttpPost("setPass")]
        public async Task<ActionResult<ServiceResponse<UsersAuthenticateResponse>>> SetNewPassword(SetPsswordRequest data)
        {
            var response = await _usersService.SetNewPassword(data.Password);
            if (response.Success && response.Data != null)
            {
                var userClaims = new List<Claim>
                {
                    new("id", response.Data.Id.ToString()),
                };

                var claimsIdentity = new ClaimsIdentity(userClaims, CookieAuthenticationDefaults.AuthenticationScheme);

                var authProperties = new AuthenticationProperties
                {
                    ExpiresUtc = DateTimeOffset.UtcNow.AddDays(14),
                    IsPersistent = true,
                };

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);
            }
            return Ok(response);
        }
    }
}
