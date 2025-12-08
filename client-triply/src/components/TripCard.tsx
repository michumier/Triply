import { MapPin, Calendar, Users, Tag } from "lucide-react";

export interface Trip {
    id: number;
    title: string;
    destination: string;
    days: number;
    people: number;
    interests: string[];
    imageUrl?: string;
    createdAt?: string;
}

interface TripCardProps {
    trip: Trip;
    onClick?: () => void;
}

export const TripCard = ({ trip, onClick }: TripCardProps) => {
    return (
        <div 
            onClick={onClick}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
        >
            {/* Header con imagen o gradiente */}
            {trip.imageUrl ? (
                <div 
                    className="h-32 bg-cover bg-center"
                    style={{ backgroundImage: `url(${trip.imageUrl})` }}
                ></div>
            ) : (
                <div className="h-32 bg-gradient-to-br from-primary to-secondary"></div>
            )}
            
            {/* Contenido */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{trip.title}</h3>
                
                {/* Info del viaje */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-secondary" />
                        <span>{trip.destination}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-secondary" />
                        <span>{trip.days} {trip.days === 1 ? 'día' : 'días'}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                        <Users className="w-4 h-4 mr-2 text-secondary" />
                        <span>{trip.people} {trip.people === 1 ? 'persona' : 'personas'}</span>
                    </div>
                </div>

                {/* Tags de intereses */}
                {trip.interests && trip.interests.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                        {trip.interests.slice(0, 3).map((interest, index) => (
                            <span 
                                key={index}
                                className="px-3 py-1 bg-secondary bg-opacity-20 text-primary text-xs rounded-full flex items-center"
                            >
                                <Tag className="w-3 h-3 mr-1" />
                                {interest}
                            </span>
                        ))}
                        {trip.interests.length > 3 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{trip.interests.length - 3} más
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
