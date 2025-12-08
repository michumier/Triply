using server.Models;

namespace server.Services
{
    public interface ITripService
    {
        string GetPlaceholder();
        Task<Trip> CreateTripAsync(Trip trip);
        Task<List<Trip>> GetUserTripsAsync(int userId);
    }
}
