using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("tripparticipants")]
    public class TripParticipant
    {
        [Key]
        [Column("idparticipant")]
        public int IdParticipant { get; set; }

        [Required]
        [Column("idtrip")]
        public int IdTrip { get; set; }

        [Required]
        [Column("iduser")]
        public int IdUser { get; set; }

        [Required]
        [MaxLength(10)]
        [Column("role")]
        public string Role { get; set; } = "viewer";

        [Column("joinedat")]
        public DateTime JoinedAt { get; set; } = DateTime.Now;

        // Navigation properties
        [ForeignKey("IdTrip")]
        public Trip Trip { get; set; } = null!;

        [ForeignKey("IdUser")]
        public User User { get; set; } = null!;
    }
}
