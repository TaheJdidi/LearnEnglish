namespace LearnEnglish.Application.DTOs
{
    public class SessionResponse
    {
        public Guid Id { get; set; }

        public string UserId { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
    }
}
