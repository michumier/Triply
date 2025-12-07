using server.Agent.Models;

namespace server.Agent
{
    public class HuggingFaceService : IHuggingFaceService
    {
        private readonly HttpClient _httpClient;

        public HuggingFaceService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> AnalyzeAsync(AgentRequest request)
        {
            // Placeholder for actual Hugging Face API call
            // We will need to configure the API Key and URL later
            return await Task.FromResult($"AI Response to: {request.Input}");
        }
    }
}
