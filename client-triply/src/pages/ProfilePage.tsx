import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, LogOut } from "lucide-react";
import { TripCard, type Trip } from "../components/TripCard";
import { userService } from "../services/userService";

export const ProfilePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTrips();
    }, []);

    const loadTrips = async () => {
        try {
            // Por ahora usamos datos mock
            // TODO: Cuando tengamos el userId real, llamar a userService.getUserTrips(userId)
            const mockTrips = userService.getMockTrips();
            setTrips(mockTrips);
        } catch (error) {
            console.error("Error loading trips:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTripClick = (tripId: number) => {
        // TODO: Navegar a página de detalles del viaje
        console.log("Ver detalles del viaje:", tripId);
    };

    return (
        <div className="min-h-screen" style={{
            background: "linear-gradient(135deg, #2A6F97 0%, #1F5675 100%)"
        }}>
            {/* Header */}
            <div className="bg-white bg-opacity-95 shadow-sm p-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/welcome")}
                            className="text-primary hover:text-secondary transition"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-bold text-primary">Mi Perfil</h1>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-coral hover:text-red-600 font-medium transition"
                    >
                        <LogOut className="w-5 h-5" />
                        Cerrar sesión
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* User Info Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex items-center gap-6">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl">
                            {user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                        </div>
                        
                        {/* User Details */}
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-primary mb-2">{user?.fullName}</h2>
                            <div className="flex items-center text-gray-600">
                                <Mail className="w-4 h-4 mr-2" />
                                <span>{user?.email}</span>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="text-center px-6 border-l border-gray-200">
                            <div className="text-3xl font-bold text-primary">{trips.length}</div>
                            <div className="text-sm text-gray-600">Viajes</div>
                        </div>
                    </div>
                </div>

                {/* Trips Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h3 className="text-2xl font-bold text-primary mb-6">Mis Viajes</h3>
                    
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="text-gray-500">Cargando viajes...</div>
                        </div>
                    ) : trips.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-500 mb-4">Aún no has creado ningún viaje</div>
                            <button
                                onClick={() => navigate("/new-trip")}
                                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                            >
                                Crear mi primer viaje
                            </button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trips.map((trip) => (
                                <TripCard
                                    key={trip.id}
                                    trip={trip}
                                    onClick={() => handleTripClick(trip.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
