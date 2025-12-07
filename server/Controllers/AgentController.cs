using Microsoft.AspNetCore.Mvc;
using server.Agent;
using server.Agent.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgentController : ControllerBase
    {
        private readonly IHuggingFaceService _huggingFaceService;

        public AgentController(IHuggingFaceService huggingFaceService)
        {
            _huggingFaceService = huggingFaceService;
        }

        [HttpPost("analyze")]
        public async Task<IActionResult> Analyze([FromBody] AgentRequest request)
        {
            var result = await _huggingFaceService.AnalyzeAsync(request);
            return Ok(new { Response = result });
        }
    }
}
