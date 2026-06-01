using Microsoft.AspNetCore.Identity;

namespace LearnEnglish.Domain
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; } = string.Empty;

        public string? EnglishLevel { get; set; }

        public string? LearningGoal { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
