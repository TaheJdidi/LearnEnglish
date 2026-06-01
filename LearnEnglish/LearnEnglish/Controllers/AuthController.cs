using LearnEnglish.Application.DTOs;
using LearnEnglish.Application.Interfaces;

using Microsoft.AspNetCore.Mvc;

namespace LearnEnglish.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
            => Ok(await _authService.RegisterAsync(request));

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
            => Ok(await _authService.LoginAsync(request));

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(RefreshRequest request)
            => Ok(await _authService.RefreshAsync(request));

        [HttpPost("logout")]
        public async Task<IActionResult> Logout(LogoutRequest request)
        {
            await _authService.LogoutAsync(request);
            return Ok(new { message = "Logged out successfully" });
        }
           
    }
}
