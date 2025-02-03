using System.Security.Claims;

namespace plusminus.Services;

/// <summary>
/// Сервис для работы с http context.
/// </summary>
public class HttpContextAccessorService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public HttpContextAccessorService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    /// <summary>
    /// Получить идентификатор пользователя.
    /// </summary>
    /// <returns>Идентификатор пользователя.</returns>
    /// <exception cref="Exception">Необходима автризация</exception>
    public int GetUserId()
    {
        var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue("id");

        if (userId == null) throw new Exception("Необходима авторизация");

        return int.Parse(userId);
    }
}