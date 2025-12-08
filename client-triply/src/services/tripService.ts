const API_URL = 'http://localhost:5222/api';

export interface TripFormData {
    destination: string;
    days: string;
    people: string;
    interests: string[];
    transport: string;
    budget: string;
}

class TripService {
    async generateTrip(formData: TripFormData): Promise<any> {
        // Formatear los datos para el prompt
        const formattedData = `
Destino: ${formData.destination}
Número de días: ${formData.days}
Número de personas: ${formData.people}
Intereses: ${formData.interests.join(', ')}
Medio de transporte: ${formData.transport}
Presupuesto: ${formData.budget ? `${formData.budget}€` : 'No especificado'}
        `.trim();

        console.log("📤 Datos formateados a enviar:", formattedData);
        console.log("📤 JSON que se enviará:", JSON.stringify(formattedData));

        const response = await fetch(`${API_URL}/qwen/generar-viaje`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedData),
        });

        console.log("📥 Status de respuesta:", response.status);
        console.log("📥 Headers de respuesta:", response.headers);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ Error del servidor:", errorText);
            throw new Error(errorText || 'Failed to generate trip');
        }

        const jsonResponse = await response.json();
        console.log("✅ Respuesta JSON:", jsonResponse);
        return jsonResponse;
    }
}

export const tripService = new TripService();
