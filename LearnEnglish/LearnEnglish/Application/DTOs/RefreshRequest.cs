namespace LearnEnglish.Application.DTOs
{
    public class RefreshRequest
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
    }
}
