using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

public class QwenService
{
    private readonly HttpClient _http;
    private readonly string _token;
    private readonly string _modelId;
    private readonly ILogger<QwenService> _logger;

    public QwenService(IConfiguration config, ILogger<QwenService> logger)
    {
        _http = new HttpClient();
        _token = config["HuggingFace:ApiKey"];
        _modelId = config["HuggingFace:ModelId"];
        _logger = logger;
        _http.DefaultRequestHeaders.Authorization = 
            new AuthenticationHeaderValue("Bearer", _token);
    }

    public async Task<string> GenerateResponseAsync(string prompt)
    {
        //var url = $"https://api-inference.huggingface.co/models/{_modelId}";
        var url ="https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-8B-Instruct";

        _logger.LogInformation("Llamando a Hugging Face API: {Url}", url);
        _logger.LogInformation("Modelo: {ModelId}", _modelId);

        var body = new
        {
            inputs = prompt,
            parameters = new
            {
                max_new_tokens = 500,
                temperature = 0.7,
                return_full_text = false
            },
            options = new { wait_for_model = true }
        };

        var json = JsonSerializer.Serialize(body);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _http.PostAsync(url, content);
        var result = await response.Content.ReadAsStringAsync();

        _logger.LogInformation("Status Code: {StatusCode}", response.StatusCode);
        _logger.LogInformation("Response: {Response}", result.Length > 500 ? result.Substring(0, 500) + "..." : result);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("Error de Hugging Face API: {StatusCode} - {Response}", response.StatusCode, result);
            throw new HttpRequestException($"Hugging Face API error: {response.StatusCode} - {result}");
        }

        return result;
    }
}
