using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services
{
    public class TripService : ITripService
    {
        private readonly ApplicationDbContext _context;

        public TripService(ApplicationDbContext context)
        {
            _context = context;
        }

        public string GetPlaceholder()
        {
            return "Trip Service works!";
        }

        public async Task<Trip> CreateTripAsync(Trip trip)
        {
            trip.CreatedAt = DateTime.Now;
            trip.UpdatedAt = DateTime.Now;
            trip.Status = "planning";

            _context.Trips.Add(trip);
            await _context.SaveChangesAsync();

            return trip;
        }

        public async Task<List<Trip>> GetUserTripsAsync(int userId)
        {
            return await _context.Trips
                .Where(t => t.IdUserOwner == userId)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }
    }
}
