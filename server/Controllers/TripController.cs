using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TripController : ControllerBase
    {
        private readonly ITripService _tripService;

        public TripController(ITripService tripService)
        {
            _tripService = tripService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tripService.GetPlaceholder());
        }

        [HttpPost]
        public async Task<IActionResult> CreateTrip([FromBody] CreateTripDto tripDto)
        {
            try
            {
                var trip = new Trip
                {
                    IdUserOwner = tripDto.UserId,
                    Title = tripDto.Title,
                    Description = tripDto.Description,
                    StartDate = tripDto.StartDate,
                    EndDate = tripDto.EndDate,
                    Budget = tripDto.Budget,
                    CoverImage = tripDto.ImageUrl
                };

                var createdTrip = await _tripService.CreateTripAsync(trip);

                return Ok(new
                {
                    id = createdTrip.IdTrip,
                    title = createdTrip.Title,
                    destination = tripDto.Destination,
                    days = tripDto.Days,
                    people = tripDto.People,
                    interests = tripDto.Interests,
                    imageUrl = createdTrip.CoverImage,
                    createdAt = createdTrip.CreatedAt
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Error creating trip", message = ex.Message });
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserTrips(int userId)
        {
            try
            {
                var trips = await _tripService.GetUserTripsAsync(userId);

                // Transform to frontend format
                var result = trips.Select(t => new
                {
                    id = t.IdTrip,
                    title = t.Title,
                    destination = t.Description ?? "Destino desconocido",
                    days = t.StartDate.HasValue && t.EndDate.HasValue
                        ? (t.EndDate.Value - t.StartDate.Value).Days + 1
                        : 1,
                    people = 1, // TODO: Get from participants
                    interests = new string[] { }, // TODO: Get from destinations/activities
                    imageUrl = t.CoverImage,
                    createdAt = t.CreatedAt
                });

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Error fetching trips", message = ex.Message });
            }
        }
    }

    // DTO for creating trips
    public class CreateTripDto
    {
        public int UserId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Destination { get; set; } = string.Empty;
        public int Days { get; set; }
        public int People { get; set; }
        public string[]? Interests { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal? Budget { get; set; }
        public string? ImageUrl { get; set; }
    }
}
