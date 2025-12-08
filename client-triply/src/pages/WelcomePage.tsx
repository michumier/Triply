import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users } from "lucide-react";

export const WelcomePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen" style={{
            background: "linear-gradient(135deg, #2A6F97 0%, #1F5675 100%)"
        }}>
            <nav className="bg-white bg-opacity-95 shadow-sm p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-primary">Triply 🌍</h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/profile")}
                        className="flex items-center gap-3 text-primary hover:text-secondary font-medium transition group"
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition">
                            {user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                        </div>
                        <span className="hidden sm:inline">{user?.fullName}</span>
                    </button>
                    <button
                        onClick={logout}
                        className="text-coral hover:text-red-600 font-medium transition"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <header className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                        Planifica Tu Próxima Aventura
                    </h2>
                    <p className="text-xl text-white text-opacity-90 max-w-2xl mx-auto drop-shadow">
                        Descubre itinerarios personalizados impulsados por IA. Dinos qué te gusta y nosotros nos encargamos del resto.
                    </p>
                    <button 
                        onClick={() => navigate("/new-trip")}
                        style={{ backgroundColor: "#F7EF8B" }}
                        className="mt-8 bg-sand text-primary px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:bg-opacity-90 transition transform hover:-translate-y-1"
                    >
                        Iniciar Nuevo Viaje
                    </button>
                </header>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-sand">
                        <MapPin className="text-primary w-12 h-12 mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-primary">Destinos Inteligentes</h3>
                        <p className="text-gray-600">Encuentra los lugares perfectos que coinciden con tu estilo.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-secondary">
                        <Calendar className="text-primary w-12 h-12 mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-primary">Planes Diarios</h3>
                        <p className="text-gray-600">Itinerarios detallados día a día optimizados para ti.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-coral">
                        <Users className="text-primary w-12 h-12 mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-primary">Colaborativo</h3>
                        <p className="text-gray-600">Perfecto para viajes en solitario, parejas o grupos.</p>
                    </div>
                </div>

                {/* Sección de Viajes de Ejemplo */}
                <div className="mt-16">
                    <h3 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
                        Viajes Generados por IA
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
                            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop)' }}></div>
                            <div className="p-6">
                                <h4 className="text-xl font-bold text-primary mb-2">Barcelona Romántica</h4>
                                <p className="text-gray-600 text-sm mb-4">5 días • 2 personas • En pareja</p>
                                <p className="text-gray-700 mb-4">
                                    Descubre la magia de Barcelona con tu pareja. Gastronomía, arte y playas mediterráneas.
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="px-3 py-1 bg-sand bg-opacity-30 text-primary text-xs rounded-full">Gastronomía</span>
                                    <span className="px-3 py-1 bg-secondary bg-opacity-30 text-primary text-xs rounded-full">Cultura</span>
                                    <span className="px-3 py-1 bg-coral bg-opacity-30 text-primary text-xs rounded-full">Romántico</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
                            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop)' }}></div>
                            <div className="p-6">
                                <h4 className="text-xl font-bold text-primary mb-2">Aventura en Tokio</h4>
                                <p className="text-gray-600 text-sm mb-4">7 días • 4 personas • Con amigos</p>
                                <p className="text-gray-700 mb-4">
                                    Explora la vibrante capital japonesa. Templos antiguos, tecnología y vida nocturna.
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="px-3 py-1 bg-sand bg-opacity-30 text-primary text-xs rounded-full">Cultura</span>
                                    <span className="px-3 py-1 bg-secondary bg-opacity-30 text-primary text-xs rounded-full">Aventura</span>
                                    <span className="px-3 py-1 bg-coral bg-opacity-30 text-primary text-xs rounded-full">Fiesta</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
                            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop)' }}></div>
                            <div className="p-6">
                                <h4 className="text-xl font-bold text-primary mb-2">París Cultural</h4>
                                <p className="text-gray-600 text-sm mb-4">4 días • 1 persona • Solo</p>
                                <p className="text-gray-700 mb-4">
                                    Sumérgete en el arte y la historia de la Ciudad de la Luz. Museos y gastronomía francesa.
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="px-3 py-1 bg-sand bg-opacity-30 text-primary text-xs rounded-full">Museos</span>
                                    <span className="px-3 py-1 bg-secondary bg-opacity-30 text-primary text-xs rounded-full">Gastronomía</span>
                                    <span className="px-3 py-1 bg-coral bg-opacity-30 text-primary text-xs rounded-full">Arte</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
