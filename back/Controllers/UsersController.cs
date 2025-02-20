using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using plusminus.Dtos.Users;
using plusminus.Models;
using System.Security.Claims;
using plusminus.Services;

namespace plusminus.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UsersService _usersService;

        public UsersController(UsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<ServiceResponse<UsersRegisterResponse>>> Register(UsersRegisterRequest user, CancellationToken cancellationToken)
        {
            var response = await _usersService.Register(user, cancellationToken);

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

        [HttpPost("Auth")]
        public async Task<ActionResult<ServiceResponse<UsersAuthenticateResponse>>> Authenticate(UsersAuthenticateRequest user, CancellationToken cancellationToken)
        {
            var response = await _usersService.Authenticate(user, cancellationToken);
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

        [HttpPost("Check")]
        public async Task<ActionResult<ServiceResponse<UsersAuthenticateResponse>>> CheckAuth(CancellationToken cancellationToken)
        {
            return Ok(await _usersService.CheckAuth(cancellationToken));
        }

        [HttpPost("Logout")]
        public async Task Logout()
        { 
            await HttpContext.SignOutAsync();
        }
        
        [HttpPost("GetRestoreCode")]
        public async Task<ActionResult<ServiceResponse<dynamic>>> GetRestoreCode(RestoreRequest data)
        {
            return Ok(await _usersService.GetRestoreCode(data.Email));
        }
        
        [HttpPost("ApplyCode")]
        public async Task<ActionResult<ServiceResponse<dynamic>>> ApplyRestoreCode(ApplyRestoreRequest data)
        {
            return Ok(await _usersService.ApplyRestoreCode(data.Code));
        }
        
        [HttpPost("SetPass")]
        public async Task<ActionResult<ServiceResponse<UsersAuthenticateResponse>>> SetNewPassword(SetPsswordRequest data, CancellationToken cancellationToken)
        {
            var response = await _usersService.SetNewPassword(data.Password, cancellationToken);
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
