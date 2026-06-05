namespace LearnEnglish.Domain
{
    public class Session
    {
        public Guid Id { get; set; }

        public string UserId { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public ApplicationUser? User { get; set; }
    }
}
