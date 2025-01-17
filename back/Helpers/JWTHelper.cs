using Microsoft.IdentityModel.Tokens;
using plusminus.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace plusminus.Helpers
{
    public class JWTHelper
    {
        //TODO ну пусть останется, вдруг пригодится. 
        static private readonly string _key = "00112233445566778899aabbccddeeff";

        static public (string accessToken, string refreshToken) GenerateJwtTokens(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_key);

            var accessTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var refreshTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var accessToken = tokenHandler.CreateToken(accessTokenDescriptor);
            var refreshToken = tokenHandler.CreateToken(refreshTokenDescriptor);

            return (tokenHandler.WriteToken(accessToken), tokenHandler.WriteToken(refreshToken));
        }

        static public int ExtractUserIdFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_key);
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };

            try
            {
                var claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;

                var idClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "id");
                if (idClaim != null && int.TryParse(idClaim.Value, out var userId))
                {
                    return userId;
                }
                else
                {
                    return -1;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Неудачная попытка расшифровать токен.", ex);
            }
        }
    }
}
