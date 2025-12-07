import { useAuth } from "../context/AuthContext";
import { MapPin, Calendar, Users } from "lucide-react";

export const WelcomePage = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-snow">
            <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-primary">Triply 🌍</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">Hello, {user?.fullName}</span>
                    <button
                        onClick={logout}
                        className="text-coral hover:text-red-600 font-medium transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <header className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-primary mb-4">
                        Plan Your Next Adventure
                    </h2>
                    <p className="text-xl text-secondary max-w-2xl mx-auto">
                        Discover personalized itineraries powered by AI. Tell us what you love, and we'll handle the rest.
                    </p>
                    <button className="mt-8 bg-coral text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:bg-opacity-90 transition transform hover:-translate-y-1">
                        Start New Trip
                    </button>
                </header>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-sand">
                        <MapPin className="text-primary w-12 h-12 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Smart Destinations</h3>
                        <p className="text-gray-600">Find the perfect spots that match your vibe.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-secondary">
                        <Calendar className="text-primary w-12 h-12 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Daily Plans</h3>
                        <p className="text-gray-600">Detailed day-by-day itineraries optimized for you.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-coral">
                        <Users className="text-primary w-12 h-12 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Collaborative</h3>
                        <p className="text-gray-600">Perfect for solo trips, couples, or groups.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
