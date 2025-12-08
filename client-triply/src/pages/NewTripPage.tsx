import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users, Heart, Utensils, Camera, Music, Plane, ArrowLeft } from "lucide-react";
import { tripService } from "../services/tripService";

export const NewTripPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        destination: "",
        days: "",
        people: "",
        interests: [] as string[],
        transport: "",
        budget: ""
    });

    const interestOptions = [
        { id: "gastronomy", label: "Gastronomía", icon: Utensils },
        { id: "culture", label: "Cultura", icon: Camera },
        { id: "museums", label: "Museos", icon: Camera },
        { id: "party", label: "Fiesta", icon: Music },
        { id: "leisure", label: "Ocio", icon: Heart },
        { id: "couple", label: "En pareja", icon: Heart },
        { id: "friends", label: "Con amigos", icon: Users },
        { id: "sports", label: "Deportes", icon: Heart }
    ];

    const transportOptions = [
        "Avión",
        "Tren",
        "Coche",
        "Autobús",
        "Barco"
    ];

    const toggleInterest = (interest: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            console.log("📤 Enviando datos del viaje:", formData);
            
            const aiResponse = await tripService.generateTrip(formData);
            
            console.log("🤖 Respuesta de la IA:", aiResponse);
            console.log("✅ Viaje generado exitosamente!");
            
            alert("¡Viaje generado! Revisa la consola para ver la respuesta de la IA.");
        } catch (error) {
            console.error("❌ Error al generar viaje:", error);
            setError(error instanceof Error ? error.message : "Error al generar el viaje");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen" style={{
            background: "linear-gradient(135deg, #2A6F97 0%, #1F5675 100%)"
        }}>
            {/* Header */}
            <div className="bg-white bg-opacity-95 shadow-sm p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <button
                        onClick={() => navigate("/welcome")}
                        className="text-primary hover:text-secondary transition"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold text-primary">Crear Nuevo Viaje</h1>
                </div>
            </div>

            {/* Form Container */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Destino */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                <MapPin className="inline w-5 h-5 mr-2 text-primary" />
                                Destino
                            </label>
                            <input
                                type="text"
                                placeholder="¿A dónde quieres ir?"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                value={formData.destination}
                                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                required
                            />
                        </div>

                        {/* Días y Personas */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    <Calendar className="inline w-5 h-5 mr-2 text-primary" />
                                    Número de días
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="30"
                                    placeholder="Ej: 5"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                    value={formData.days}
                                    onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    <Users className="inline w-5 h-5 mr-2 text-primary" />
                                    Número de personas
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    placeholder="Ej: 2"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                    value={formData.people}
                                    onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Intereses */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-3">
                                <Heart className="inline w-5 h-5 mr-2 text-primary" />
                                ¿Qué te interesa hacer?
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {interestOptions.map((option) => {
                                    const Icon = option.icon;
                                    const isSelected = formData.interests.includes(option.id);
                                    return (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => toggleInterest(option.id)}
                                            className={`p-3 rounded-lg border-2 transition transform hover:scale-105 ${
                                                isSelected
                                                    ? "border-secondary bg-secondary bg-opacity-20 text-primary"
                                                    : "border-gray-300 bg-white text-gray-700 hover:border-secondary"
                                            }`}
                                        >
                                            <Icon className={`w-5 h-5 mx-auto mb-1 ${isSelected ? "text-primary" : ""}`} />
                                            <span className="text-sm font-medium">{option.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Transporte */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                <Plane className="inline w-5 h-5 mr-2 text-primary" />
                                Medio de transporte
                            </label>
                            <select
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                value={formData.transport}
                                onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
                                required
                            >
                                <option value="">Selecciona un medio de transporte</option>
                                {transportOptions.map((transport) => (
                                    <option key={transport} value={transport}>
                                        {transport}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Presupuesto */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Presupuesto aproximado (€)
                            </label>
                            <input
                                type="number"
                                min="0"
                                placeholder="Ej: 1000"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            />
                            <p className="text-sm text-gray-500 mt-1">Opcional - nos ayuda a personalizar mejor tu viaje</p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                            style={{
                                background: "linear-gradient(90deg, #2A6F97 0%, #1F5675 100%)"
                            }}
                        >
                            Generar Mi Viaje con IA ✨
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
