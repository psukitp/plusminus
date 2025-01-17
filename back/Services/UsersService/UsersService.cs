using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using plusminus.Data;
using plusminus.Dtos.Users;
using plusminus.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using plusminus.Services.CategoryExpansesService;
using plusminus.Services.CategoryIncomesService;
using plusminus.Utils;

namespace plusminus.Services.UsersService
{
    public class UsersService : IUsersService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly ICategoryExpensesService  _categoryExpensesService;
        private readonly ICategoryIncomesService  _categoryIncomesService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMemoryCache _memoryCache;
        private readonly SMTP _smtpCredentials;

        public UsersService(IMapper mapper, DataContext context, ICategoryExpensesService categoryExpensesService,
            ICategoryIncomesService categoryIncomesService, IHttpContextAccessor httpContextAccessor,
            IMemoryCache memoryCache, IOptions<SMTP> smtpCredentials)
        {
            _mapper = mapper;
            _context = context;
            _categoryExpensesService = categoryExpensesService;
            _categoryIncomesService = categoryIncomesService;
            _httpContextAccessor = httpContextAccessor;
            _memoryCache = memoryCache;
            _smtpCredentials = smtpCredentials.Value;

        }

        public async Task<ServiceResponse<UsersAuthenticateResponse>> Authenticate(UsersAuthenticateRequest user)
        {
            var serviceResponse = new ServiceResponse<UsersAuthenticateResponse>();
            try
            {
                var dbUser = await _context.Users.Include(u => u.Settings).FirstOrDefaultAsync(u => u.Login == user.Login || u.Email == user.Login);

                if (dbUser == null) throw new Exception("Введен неправильный логин или пароль");
                if (!BCrypt.Net.BCrypt.Verify(user.Password, dbUser.PasswordHash)) throw new Exception("Введен неправильный логин или пароль");
                

                serviceResponse.Data = new UsersAuthenticateResponse
                {
                    Email = dbUser.Email,
                    Id = dbUser.Id,
                    Login = dbUser.Login,
                    Name = dbUser.Name,
                    Phone = dbUser.Phone,
                    SecondName = dbUser.SecondName,
                    Settings = dbUser.Settings
                };

            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<UsersAuthenticateResponse>> CheckAuth(int userId)
        {
            var serviceResponse = new ServiceResponse<UsersAuthenticateResponse>();
            try
            {
                var dbUser = await _context.Users.Include(u => u.Settings).FirstOrDefaultAsync(u => u.Id == userId);
                if (dbUser == null) throw new Exception("Введен неправильный логин или пароль");

                serviceResponse.Data = new UsersAuthenticateResponse
                {
                    Email = dbUser.Email,
                    Id = dbUser.Id,
                    Login = dbUser.Login,
                    Name = dbUser.Name,
                    Phone = dbUser.Phone,
                    SecondName = dbUser.SecondName,
                    Settings = dbUser.Settings
                };
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<UsersRegisterResponse>> Register(UsersRegisterRequest user)
        {
            var serviceResponse = new ServiceResponse<UsersRegisterResponse>();
            try
            {
                var sameLoginUser =  await _context.Users.Where(u => u.Login == user.Login).ToListAsync();
                if (sameLoginUser.Count > 0) throw new Exception("Пользователь с таким логином уже существует");
                
                var sameEmailUser =  await _context.Users.Where(u => u.Email == user.Email).ToListAsync();
                if (sameEmailUser.Count > 0) throw new Exception("Пользователь с такой почтой уже существует");
                
                var addedUser = new User
                {
                    Email = user.Email,
                    Login = user.Login,
                    Name = user.Name,
                    Phone = user.Phone,
                    SecondName = user.SecondName,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password)
                };
                var dbUser = await _context.Users.AddAsync(addedUser);
                await _context.SaveChangesAsync();

                var dbUserEntity = dbUser.Entity;

                if (dbUserEntity == null) throw new Exception("Пользователь не найден");

                if (user.BaseCategories)
                {
                    await _categoryExpensesService.AddBaseCategories(dbUserEntity.Id);
                    await _categoryIncomesService.AddBaseCategories(dbUserEntity.Id);
                }

                serviceResponse.Data = new UsersRegisterResponse
                {
                    Email = dbUserEntity.Email,
                    Id = dbUserEntity.Id,
                    Login = dbUserEntity.Login,
                    Name = dbUserEntity.Name,
                    Phone = dbUserEntity.Phone,
                    SecondName = dbUserEntity.SecondName,
                };


            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<dynamic>> GetRestoreCode(string email)
        {
            var serviceResponse = new ServiceResponse<dynamic>();
            try
            {
                var user = await _context.Users.Where(u => u.Email == email).ToListAsync();
                if (user.Count == 0) throw new Exception("Пользователя с таким email не найдено");
                
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
                
                _httpContextAccessor.HttpContext.Response.Cookies.Append("recoveryCode", hashedCode, new CookieOptions() { HttpOnly = true, Expires = DateTimeOffset.Now.AddMinutes(5)});

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

        public async Task<ServiceResponse<dynamic>> ApplyRestoreCode(string code)
        {
             var serviceResponse = new ServiceResponse<dynamic>();
            try
            {
                var codeWithSalt = code + _smtpCredentials.Salt;

                using SHA256 hash = SHA256.Create();
                var hashedCode =
                    Convert.ToHexString(hash.ComputeHash(Encoding.ASCII.GetBytes(codeWithSalt)));

                _httpContextAccessor.HttpContext.Request.Cookies.TryGetValue("recoveryCode",
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
        
        public async Task<ServiceResponse<UsersAuthenticateResponse>> SetNewPassword(string password)
        {
            var serviceResponse = new ServiceResponse<UsersAuthenticateResponse>();
            try
            {
                _httpContextAccessor.HttpContext.Request.Cookies.TryGetValue("recoveryCode",
                    out string? codeFromCookie);

                _memoryCache.TryGetValue(codeFromCookie, out string? mailFromCookie);

                var user = await _context.Users.Include(u => u.Settings).Where(u => u.Email == mailFromCookie).FirstAsync();
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);

                await _context.SaveChangesAsync();

                var response = new UsersAuthenticateResponse()
                {
                    Email = user.Email,
                    Id = user.Id,
                    Login = user.Login,
                    Name = user.Name,
                    Phone = user.Phone,
                    SecondName = user.SecondName,
                    Settings = user.Settings
                };

                serviceResponse.Data = response;
                
                _httpContextAccessor.HttpContext.Response.Cookies.Delete("recoveryCode");

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
