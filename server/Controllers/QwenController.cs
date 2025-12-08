using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[ApiController]
[Route("api/[controller]")]
public class QwenController : ControllerBase
{
    private readonly QwenService _qwen;
    private readonly ILogger<QwenController> _logger;

    public QwenController(QwenService qwen, ILogger<QwenController> logger)
    {
        _qwen = qwen;
        _logger = logger;
    }

    [HttpPost("generar-viaje")]
    public async Task<IActionResult> GenerarViaje([FromBody] string formData)
    {
        try
        {
            _logger.LogInformation("Recibida solicitud de generación de viaje");
            _logger.LogInformation("Datos del formulario: {FormData}", formData);

            // ---- PROMPT ----
            string prompt = $@"
Eres un asistente experto en viajes.
Devuelve SOLO un JSON válido con la estructura:

{{
  ""destino"": ""nombre del destino"",
  ""descripcion"": ""descripción breve del viaje"",
  ""dias"": número de días,
  ""actividades"": [""actividad1"", ""actividad2"", ""actividad3""],
  ""recomendaciones"": [""recomendación1"", ""recomendación2""]
}}

Información del usuario:
{formData}

Responde SOLO con el JSON, sin texto adicional.
";

            _logger.LogInformation("Prompt generado, llamando a Qwen...");

            // ---- LLAMADA A QWEN ----
            var raw = await _qwen.GenerateResponseAsync(prompt);

            _logger.LogInformation("Respuesta recibida de Qwen");

            // ---- PARSEAR RESPUESTA ----
            try
            {
                using var doc = JsonDocument.Parse(raw);
                
                // Caso típico: [{"generated_text": "..."}]
                if (doc.RootElement.ValueKind == JsonValueKind.Array &&
                    doc.RootElement.GetArrayLength() > 0 &&
                    doc.RootElement[0].TryGetProperty("generated_text", out var gt))
                {
                    var text = gt.GetString();
                    _logger.LogInformation("Texto generado extraído: {Text}", text?.Substring(0, Math.Min(200, text?.Length ?? 0)));

                    // extraemos el JSON final
                    var jsonOnly = ExtraerJson(text ?? "");

                    var parsed = JsonDocument.Parse(jsonOnly);

                    return Ok(parsed.RootElement);
                }

                // Si no es array, intentar parsear directamente
                return Ok(doc.RootElement);
            }
            catch (JsonException jsonEx)
            {
                _logger.LogError(jsonEx, "Error al parsear JSON de respuesta");
                return Ok(new { 
                    raw, 
                    error = "No se pudo parsear la respuesta como JSON",
                    message = jsonEx.Message 
                });
            }
        }
        catch (HttpRequestException httpEx)
        {
            _logger.LogError(httpEx, "Error HTTP al llamar a Hugging Face");
            return BadRequest(new { 
                error = "Error al comunicarse con el servicio de IA", 
                details = httpEx.Message 
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error inesperado al generar viaje");
            return BadRequest(new { 
                error = "Error inesperado", 
                message = ex.Message,
                type = ex.GetType().Name
            });
        }
    }

    private string ExtraerJson(string text)
    {
        int start = text.IndexOf('{');
        int end = text.LastIndexOf('}');
        if (start != -1 && end != -1)
        {
            return text.Substring(start, (end - start + 1));
        }
        return text;
    }
}
