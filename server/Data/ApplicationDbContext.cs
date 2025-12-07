using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // DbSets
        public DbSet<User> Users { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<TripParticipant> TripParticipants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.IdUser);
                entity.Property(e => e.IdUser).ValueGeneratedOnAdd();
                entity.HasIndex(e => e.Username).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
                
                entity.HasMany(e => e.OwnedTrips)
                    .WithOne(e => e.Owner)
                    .HasForeignKey(e => e.IdUserOwner)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(e => e.TripParticipations)
                    .WithOne(e => e.User)
                    .HasForeignKey(e => e.IdUser)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Trip configuration
            modelBuilder.Entity<Trip>(entity =>
            {
                entity.HasKey(e => e.IdTrip);
                entity.HasIndex(e => e.IdUserOwner);
                entity.HasIndex(e => e.Status);

                entity.HasMany(e => e.Destinations)
                    .WithOne(e => e.Trip)
                    .HasForeignKey(e => e.IdTrip)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(e => e.Participants)
                    .WithOne(e => e.Trip)
                    .HasForeignKey(e => e.IdTrip)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Destination configuration
            modelBuilder.Entity<Destination>(entity =>
            {
                entity.HasKey(e => e.IdDestination);
                entity.HasIndex(e => e.IdTrip);

                entity.HasMany(e => e.Activities)
                    .WithOne(e => e.Destination)
                    .HasForeignKey(e => e.IdDestination)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Activity configuration
            modelBuilder.Entity<Activity>(entity =>
            {
                entity.HasKey(e => e.IdActivity);
                entity.HasIndex(e => e.IdDestination);
                entity.HasIndex(e => e.ActivityDate);
            });

            // TripParticipant configuration
            modelBuilder.Entity<TripParticipant>(entity =>
            {
                entity.HasKey(e => e.IdParticipant);
                entity.HasIndex(e => new { e.IdTrip, e.IdUser }).IsUnique();
                entity.HasIndex(e => e.IdUser);
            });
        }
    }
}
