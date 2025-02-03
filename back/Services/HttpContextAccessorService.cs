using System.Security.Claims;

namespace plusminus.Services;

public class HttpContextAccessorService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public HttpContextAccessorService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public int GetUserId()
    {
        var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue("id");

        if (userId == null) throw new Exception("Необходима авторизация");

        return int.Parse(userId);
    }
}