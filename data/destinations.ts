export interface TripData {
    city: string;
    country?: string;
    img: string;
    flights: {
        airline: string;
        route?: string;
        time: string;
        price: number;
        class?: string;
    };
    hotel: {
        name: string;
        location?: string;
        rating: string;
        price: number;
        amenities?: string[];
    };
    currency: string;
    totalCost?: number;
    reasoning?: string;
}

export const destinations: Record<string, TripData> = {
    london: {
        city: "London",
        country: "United Kingdom",
        img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=100&q=80",
        flights: { airline: "British Airways", time: "08:45 - 10:00", price: 120 },
        hotel: { name: "The Hoxton, Southwark", rating: "4.8", price: 210 },
        currency: "£"
    },
    paris: {
        city: "Paris",
        country: "France",
        img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=100&q=80",
        flights: { airline: "Air France", time: "10:30 - 13:15", price: 185 },
        hotel: { name: "CitizenM Gare de Lyon", rating: "4.6", price: 195 },
        currency: "€"
    },
    newyork: {
        city: "New York",
        country: "USA",
        img: "https://images.unsplash.com/photo-1496442226666-8d4a0e2907eb?auto=format&fit=crop&w=100&q=80",
        flights: { airline: "Virgin Atlantic", time: "11:00 - 14:30", price: 540 },
        hotel: { name: "Arlo NoMad", rating: "4.5", price: 280 },
        currency: "$"
    }
};
