using LearnEnglish.Application.DTOs;
using LearnEnglish.Application.Interfaces;
using LearnEnglish.Domain;

using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity;

namespace LearnEnglish.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtService _jwtService;
        private readonly ApplicationDbContext _db;
        
        public AuthService(
            UserManager<ApplicationUser> userManager,
            IJwtService jwtService,
            ApplicationDbContext db)
        {
            _userManager = userManager;
            _jwtService = jwtService;
            _db = db;
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            // 1. Check if user exists
            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser != null)
                throw new Exception("User already exists");

            // 2. Create user
            var user = new ApplicationUser
            {
                UserName = request.Email,
                Email = request.Email,
                FullName = request.FullName,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
                throw new Exception(string.Join(",", result.Errors.Select(e => e.Description)));

            // 3. Generate tokens
            var accessToken = _jwtService.GenerateAccessToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();

            // 4. Save refresh token
            refreshToken.UserId = user.Id;

            _db.RefreshTokens.Add(refreshToken);
            await _db.SaveChangesAsync();

            // 5. Return response
            return new AuthResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token,
                ExpiresAt = DateTime.UtcNow.AddMinutes(30)
            };
        }
        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            // 1. Find user
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
                throw new Exception("Invalid credentials");

            // 2. Check password
            var isValid = await _userManager.CheckPasswordAsync(user, request.Password);
            if (!isValid)
                throw new Exception("Invalid credentials");

            // 3. Generate tokens
            var accessToken = _jwtService.GenerateAccessToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();

            refreshToken.UserId = user.Id;

            // 4. Save refresh token
            _db.RefreshTokens.Add(refreshToken);
            await _db.SaveChangesAsync();

            return new AuthResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token,
                ExpiresAt = DateTime.UtcNow.AddMinutes(30)
            };
        }
        public async Task<AuthResponse> RefreshAsync(RefreshRequest request)
        {
            // 1. Validate refresh token
            var storedToken = await _db.RefreshTokens
                .FirstOrDefaultAsync(x => x.Token == request.RefreshToken);

            if (storedToken == null || storedToken.IsRevoked || storedToken.ExpiresAt < DateTime.UtcNow)
                throw new Exception("Invalid refresh token");

            // 2. Get user
            var user = await _userManager.FindByIdAsync(storedToken.UserId);
            if (user == null)
                throw new Exception("User not found");

            // 3. Revoke old token (ROTATION)
            storedToken.RevokedAt = DateTime.UtcNow;

            // 4. Generate new tokens
            var newAccessToken = _jwtService.GenerateAccessToken(user);
            var newRefreshToken = _jwtService.GenerateRefreshToken();
            newRefreshToken.UserId = user.Id;

            _db.RefreshTokens.Add(newRefreshToken);

            await _db.SaveChangesAsync();

            return new AuthResponse
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken.Token,
                ExpiresAt = DateTime.UtcNow.AddMinutes(30)
            };
        }
        public async Task LogoutAsync(LogoutRequest request)
        {
            var storedToken = await _db.RefreshTokens
                .FirstOrDefaultAsync(x => x.Token == request.RefreshToken);

            if (storedToken == null)
                return;

            storedToken.RevokedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();
        }
    }
}
