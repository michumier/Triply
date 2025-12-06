using server.Agent.Models;

namespace server.Agent
{
    public interface IHuggingFaceService
    {
        Task<string> AnalyzeAsync(AgentRequest request);
    }
}
