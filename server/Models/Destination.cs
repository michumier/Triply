using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("destinations")]
    public class Destination
    {
        [Key]
        [Column("iddestination")]
        public int IdDestination { get; set; }

        [Required]
        [Column("idtrip")]
        public int IdTrip { get; set; }

        [Required]
        [MaxLength(150)]
        [Column("cityname")]
        public string CityName { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        [Column("countryname")]
        public string CountryName { get; set; } = string.Empty;

        [Column("arrivaldate")]
        public DateTime? ArrivalDate { get; set; }

        [Column("departuredate")]
        public DateTime? DepartureDate { get; set; }

        [Column("latitude")]
        public decimal? Latitude { get; set; }

        [Column("longitude")]
        public decimal? Longitude { get; set; }

        [Column("notes")]
        public string? Notes { get; set; }

        [Column("displayorder")]
        public int DisplayOrder { get; set; } = 0;

        // Navigation properties
        [ForeignKey("IdTrip")]
        public Trip Trip { get; set; } = null!;

        public ICollection<Activity> Activities { get; set; } = new List<Activity>();
    }
}
