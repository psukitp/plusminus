using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace plusminus.Middlewares;

public class AuthorizeFilter: IAsyncAuthorizationFilter
{
    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        var authenticateResult = await context.HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        if (!authenticateResult.Succeeded)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        if (!int.TryParse(authenticateResult.Principal.FindFirstValue("id"), out int userId))
        {
            context.Result = new BadRequestObjectResult("Неверный идентификатор пользователя.");
            return;
        }

        context.HttpContext.Items["UserId"] = userId;
    }
}