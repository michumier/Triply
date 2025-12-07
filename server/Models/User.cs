using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("user")]
    public class User
    {
        [Key]
        [Column("iduser")]
        public int IdUser { get; set; }

        [Required]
        [MaxLength(90)]
        [Column("username")]
        public string Username { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        [Column("email")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        [Column("password")]
        public string Password { get; set; } = string.Empty;

        [MaxLength(150)]
        [Column("fullname")]
        public string? FullName { get; set; }

        [MaxLength(500)]
        [Column("profileimage")]
        public string? ProfileImage { get; set; }

        [Column("createdat")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Column("lastaccess")]
        public DateTime? LastAccess { get; set; }

        [Column("isactive")]
        public bool IsActive { get; set; } = true;

        // Navigation properties
        public ICollection<Trip> OwnedTrips { get; set; } = new List<Trip>();
        public ICollection<TripParticipant> TripParticipations { get; set; } = new List<TripParticipant>();
    }
}
