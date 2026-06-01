using LearnEnglish.Domain;

namespace LearnEnglish.Application.Interfaces
{
    public interface IJwtService
    {
        string GenerateAccessToken(ApplicationUser user);
        RefreshToken GenerateRefreshToken();
    }
}
