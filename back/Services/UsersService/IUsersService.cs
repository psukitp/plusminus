using plusminus.Dtos.Users;
using plusminus.Models;

namespace plusminus.Services.UsersService
{
    public interface IUsersService
    {
        public Task<ServiceResponse<UsersAuthenticateResponse>> Authenticate(UsersAuthenticateRequest user);
        public Task<ServiceResponse<UsersRegisterResponse>> Register(UsersRegisterRequest user);
        public Task<ServiceResponse<UsersAuthenticateResponse>> CheckAuth(int userId);
        public Task<ServiceResponse<dynamic>> GetRestoreCode(string email);
        public Task<ServiceResponse<dynamic>> ApplyRestoreCode(string code);
        public Task<ServiceResponse<UsersAuthenticateResponse>> SetNewPassword(string password);
    }
}
