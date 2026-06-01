using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

using LearnEnglish.Application.Interfaces;
using LearnEnglish.Domain;

using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace LearnEnglish.Infrastructure.Services
{
    public class JwtService : IJwtService
    {
        private readonly JwtSettings _config;

        public JwtService(IOptions<JwtSettings> options)
        {
            _config = options.Value;
        }

        public string GenerateAccessToken(ApplicationUser user)
        {
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim(ClaimTypes.Email, user.Email ?? "")
    };
            var test = Encoding.UTF8.GetBytes(_config.Key);
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config.Key));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config.Issuer,
                audience: _config.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public RefreshToken GenerateRefreshToken()
        {
            return new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                CreatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(30),
                IsRevoked = false
            };
        }
    }
}
