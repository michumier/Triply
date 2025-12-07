using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("activities")]
    public class Activity
    {
        [Key]
        [Column("idactivity")]
        public int IdActivity { get; set; }

        [Required]
        [Column("iddestination")]
        public int IdDestination { get; set; }

        [Required]
        [MaxLength(200)]
        [Column("title")]
        public string Title { get; set; } = string.Empty;

        [Column("description")]
        public string? Description { get; set; }

        [Column("activitydate")]
        public DateTime? ActivityDate { get; set; }

        [Column("starttime")]
        public TimeSpan? StartTime { get; set; }

        [Column("endtime")]
        public TimeSpan? EndTime { get; set; }

        [MaxLength(300)]
        [Column("location")]
        public string? Location { get; set; }

        [Column("cost")]
        public decimal? Cost { get; set; }

        [Required]
        [MaxLength(20)]
        [Column("category")]
        public string Category { get; set; } = "other";

        [Column("iscompleted")]
        public bool IsCompleted { get; set; } = false;

        // Navigation properties
        [ForeignKey("IdDestination")]
        public Destination Destination { get; set; } = null!;
    }
}
