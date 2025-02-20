using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using plusminus.Dtos.Users;
using plusminus.Models;
using plusminus.Repository;
using plusminus.Utils;

namespace plusminus.Services
{
    /// <summary>
    /// Сервис для работы с пользователями.
    /// </summary>
    public class UsersService
    {
        private readonly IMapper _mapper;
        private readonly CategoryExpensesService  _categoryExpensesService;
        private readonly CategoryIncomesService  _categoryIncomesService;
        private readonly IMemoryCache _memoryCache;
        private readonly SMTP _smtpCredentials;
        private readonly IRepository<User> _repository;
        private readonly HttpContextAccessorService _httpContextAccessor;

        public UsersService(IMapper mapper, CategoryExpensesService categoryExpensesService,
            CategoryIncomesService categoryIncomesService, HttpContextAccessorService httpContextAccessor,
            IMemoryCache memoryCache, IOptions<SMTP> smtpCredentials, IRepository<User> repository)
        {
            _mapper = mapper;
            _categoryExpensesService = categoryExpensesService;
            _categoryIncomesService = categoryIncomesService;
            _httpContextAccessor = httpContextAccessor;
            _memoryCache = memoryCache;
            _smtpCredentials = smtpCredentials.Value;
            _repository = repository;

        }
        
        /// <summary>
        /// Авторизоваться.
        /// </summary>
        /// <param name="user">Данные для входа.</param>
        /// <param name="cancellationToken">CancellationToken.</param>
        /// <returns>Информация о пользователе.</returns>
        /// <exception cref="Exception">Неверный логин или пароль.</exception>
        public async Task<ServiceResponse<UsersAuthenticateResponse>> Authenticate(UsersAuthenticateRequest user, CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<UsersAuthenticateResponse>();
            try
            {
                var entity = await _repository
                    .GetAll()
                    .Where(u => u.Login.ToLower() == user.Login.ToLower() || u.Email.ToLower() == user.Login.ToLower())
                    .Include(u => u.Settings)
                    .FirstOrDefaultAsync(cancellationToken);
                
                if (entity == null) throw new Exception("Введен неправильный логин или пароль");
                if (!BCrypt.Net.BCrypt.Verify(user.Password, entity.PasswordHash)) throw new Exception("Введен неправильный логин или пароль");


                serviceResponse.Data = _mapper.Map<UsersAuthenticateResponse>(entity);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        /// <summary>
        /// Проверить авторизацию.
        /// </summary>
        /// <param name="cancellationToken">CancellationToken.</param>
        /// <returns>Информация о пользователе.</returns>
        public async Task<ServiceResponse<UsersAuthenticateResponse>> CheckAuth(CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<UsersAuthenticateResponse>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                var entity = await _repository.GetAll()
                    .Where(u => u.Id == userId)
                    .Include(u => u.Settings)
                    .FirstOrDefaultAsync(cancellationToken);

                serviceResponse.Data = _mapper.Map<UsersAuthenticateResponse>(entity);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        /// <summary>
        /// Зарегистрироваться.
        /// </summary>
        /// <param name="user">Данные для регистрации.</param>
        /// <param name="cancellationToken">CancellationToken.</param>
        /// <returns>Информация о пользователе</returns>
        /// <exception cref="Exception">Дубликат почты/дубликат логина.</exception>
        public async Task<ServiceResponse<UsersRegisterResponse>> Register(UsersRegisterRequest user, CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<UsersRegisterResponse>();
            try
            {
                var sameLoginUser = _repository.Get(u => string.Equals(u.Login, user.Login, StringComparison.CurrentCultureIgnoreCase)).FirstOrDefault();
                if (sameLoginUser != null) throw new Exception("Пользователь с таким логином уже существует");
                
                var sameEmailUser =  _repository.Get(u => string.Equals(u.Email, user.Email, StringComparison.CurrentCultureIgnoreCase)).FirstOrDefault();
                if (sameEmailUser != null) throw new Exception("Пользователь с такой почтой уже существует");
                
                var newUser = new User
                {
                    Email = user.Email,
                    Login = user.Login,
                    Name = user.Name,
                    Phone = user.Phone,
                    SecondName = user.SecondName,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password)
                };

                var addedUser = await _repository.Add(newUser, cancellationToken);

                if (user.BaseCategories)
                {
                    await _categoryExpensesService.AddBaseCategories(addedUser.Id, cancellationToken);
                    await _categoryIncomesService.AddBaseCategories(addedUser.Id, cancellationToken);
                }

                serviceResponse.Data = _mapper.Map<UsersRegisterResponse>(addedUser);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        /// <summary>
        /// Получить код для восстановления.
        /// </summary>
        /// <param name="email">Почта.</param>
        /// <returns>Ошибка при наличии.</returns>
        /// <exception cref="Exception">Не найден пользователь.</exception>
        public async Task<ServiceResponse<dynamic>> GetRestoreCode(string email)
        {
            var serviceResponse = new ServiceResponse<dynamic>();
            try
            {
                var user = _repository.Get(u => u.Email == email).FirstOrDefault();
                if (user == null) throw new Exception("Пользователь с таким email не найдено");
                
                var rnd = new Random();
                var recoveryCode = rnd.Next(1000, 9999).ToString();
                var codeWithSalt = recoveryCode + _smtpCredentials.Salt;

                using SHA256 hash = SHA256.Create();
                var hashedCode =
                    Convert.ToHexString(hash.ComputeHash(Encoding.ASCII.GetBytes(codeWithSalt)));
                
                var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "./Utils/email_template.html");
                var emailBody = await File.ReadAllTextAsync(templatePath);
                
                emailBody = emailBody.Replace("{{CODE}}", recoveryCode);
                
                var smtpClient = new SmtpClient("smtp.mail.ru")
                {
                    Port = 587,
                    Credentials = new NetworkCredential(_smtpCredentials.Email, _smtpCredentials.Pass),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_smtpCredentials.Email),
                    Subject = "Восстановление пароля",
                    Body = emailBody,
                    IsBodyHtml = true,
                };

                mailMessage.To.Add(email);

                smtpClient.Send(mailMessage);
                
                _httpContextAccessor.GetHttpContext()?.Response.Cookies.Append("recoveryCode", hashedCode, new CookieOptions() { HttpOnly = true, Expires = DateTimeOffset.Now.AddMinutes(5)});

                _memoryCache.Set(hashedCode, email,
                    new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(5)));

            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        /// <summary>
        /// Применить код восстановления.
        /// </summary>
        /// <param name="code">Код восстановления.</param>
        /// <returns>Ошибка при наличии.</returns>
        /// <exception cref="Exception">Неверный код.</exception>
        public async Task<ServiceResponse<dynamic>> ApplyRestoreCode(string code)
        {
             var serviceResponse = new ServiceResponse<dynamic>();
            try
            {
                var codeWithSalt = code + _smtpCredentials.Salt;

                using SHA256 hash = SHA256.Create();
                var hashedCode =
                    Convert.ToHexString(hash.ComputeHash(Encoding.ASCII.GetBytes(codeWithSalt)));

                _httpContextAccessor.GetHttpContext().Request.Cookies.TryGetValue("recoveryCode",
                    out string? codeFromCookie);
                
                if (codeFromCookie == null || hashedCode != codeFromCookie) throw new Exception("Неверно введен код");
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }
        
        /// <summary>
        /// Установить новый пароль.
        /// </summary>
        /// <param name="password">Пароль.</param>
        /// <param name="cancellationToken">CancellationToken.</param>
        /// <returns>Данные о пользователе.</returns>
        public async Task<ServiceResponse<UsersAuthenticateResponse>> SetNewPassword(string password, CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<UsersAuthenticateResponse>();
            try
            {
                _httpContextAccessor.GetHttpContext().Request.Cookies.TryGetValue("recoveryCode",
                    out string? codeFromCookie);

                _memoryCache.TryGetValue(codeFromCookie, out string? mailFromCookie);

                var entity = await _repository
                    .GetAll()
                    .Where(u => u.Email == mailFromCookie)
                    .Include(u => u.Settings)
                    .FirstAsync(cancellationToken);
                
                entity.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);

                await _repository.Update(entity, cancellationToken);

                var response = _mapper.Map<UsersAuthenticateResponse>(entity); 

                serviceResponse.Data = response;
                
                _httpContextAccessor.GetHttpContext()?.Response.Cookies.Delete("recoveryCode");

            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }
    }
}
