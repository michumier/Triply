const API_URL = 'http://localhost:5222/api';

export interface UserTrip {
    id: number;
    title: string;
    destination: string;
    days: number;
    people: number;
    interests: string[];
    imageUrl?: string;
    createdAt: string;
}

class UserService {
    async getUserTrips(userId: number): Promise<UserTrip[]> {
        const response = await fetch(`${API_URL}/trip/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Failed to fetch user trips');
        }

        return response.json();
    }

    // Mock data para desarrollo mientras no tengamos viajes reales
    getMockTrips(): UserTrip[] {
        return [
            {
                id: 1,
                title: "Barcelona Romántica",
                destination: "Barcelona, España",
                days: 5,
                people: 2,
                interests: ["Gastronomía", "Cultura", "Romántico"],
                imageUrl: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop",
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                title: "Aventura en Tokio",
                destination: "Tokio, Japón",
                days: 7,
                people: 4,
                interests: ["Cultura", "Aventura", "Fiesta"],
                imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
                createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 3,
                title: "París Cultural",
                destination: "París, Francia",
                days: 4,
                people: 1,
                interests: ["Museos", "Gastronomía", "Arte"],
                imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
                createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
    }
}

export const userService = new UserService();
