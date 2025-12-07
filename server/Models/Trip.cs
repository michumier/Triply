using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("trips")]
    public class Trip
    {
        [Key]
        [Column("idtrip")]
        public int IdTrip { get; set; }

        [Required]
        [Column("iduserowner")]
        public int IdUserOwner { get; set; }

        [Required]
        [MaxLength(200)]
        [Column("title")]
        public string Title { get; set; } = string.Empty;

        [Column("description")]
        public string? Description { get; set; }

        [Column("startdate")]
        public DateTime? StartDate { get; set; }

        [Column("enddate")]
        public DateTime? EndDate { get; set; }

        [Column("budget")]
        public decimal? Budget { get; set; }

        [MaxLength(500)]
        [Column("coverimage")]
        public string? CoverImage { get; set; }

        [Required]
        [MaxLength(20)]
        [Column("status")]
        public string Status { get; set; } = "planning";

        [Column("createdat")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Column("updatedat")]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        // Navigation properties
        [ForeignKey("IdUserOwner")]
        public User Owner { get; set; } = null!;

        public ICollection<Destination> Destinations { get; set; } = new List<Destination>();
        public ICollection<TripParticipant> Participants { get; set; } = new List<TripParticipant>();
    }
}
