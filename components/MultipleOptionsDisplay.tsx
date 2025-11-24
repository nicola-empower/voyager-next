'use client';

import { Plane, Star, Check, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface FlightOption {
    id: string;
    airline: string;
    route: string;
    time: string;
    price: number;
    class: string;
    duration?: string;
}

interface HotelOption {
    id: string;
    name: string;
    location: string;
    rating: string;
    price: number;
    amenities: string[];
    img: string;
}

interface MultipleOptionsDisplayProps {
    flights: FlightOption[];
    hotels: HotelOption[];
    currency: string;
    selectedFlight: string | null;
    selectedHotel: string | null;
    onSelectFlight: (id: string) => void;
    onSelectHotel: (id: string) => void;
}

export default function MultipleOptionsDisplay({
    flights,
    hotels,
    currency,
    selectedFlight,
    selectedHotel,
    onSelectFlight,
    onSelectHotel
}: MultipleOptionsDisplayProps) {
    const [showAllFlights, setShowAllFlights] = useState(false);
    const [showAllHotels, setShowAllHotels] = useState(false);

    const displayedFlights = showAllFlights ? flights : flights.slice(0, 3);
    const displayedHotels = showAllHotels ? hotels : hotels.slice(0, 3);

    return (
        <div className="space-y-6">
            {/* Flights Section */}
            <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                    ✈️ Available Flights ({flights.length} options)
                </h3>
                <div className="space-y-3">
                    {displayedFlights.map((flight) => (
                        <div
                            key={flight.id}
                            onClick={() => onSelectFlight(flight.id)}
                            className={`bg-white p-4 rounded-lg shadow-sm border-2 cursor-pointer transition-all ${selectedFlight === flight.id
                                    ? 'border-indigo-500 bg-indigo-50'
                                    : 'border-slate-200 hover:border-indigo-300'
                                }`}
                        >
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                <div className="p-2 bg-sky-50 rounded-full text-sky-600">
                                    <Plane className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900">{flight.airline}</h4>
                                    <p className="text-slate-500 text-sm">{flight.route} • {flight.time}</p>
                                    <p className="text-slate-400 text-xs mt-1">{flight.class}</p>
                                </div>
                                <div className="text-right">
                                    {selectedFlight === flight.id && (
                                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-1">
                                            <Check className="h-3 w-3 mr-1" />
                                            Selected
                                        </div>
                                    )}
                                    <p className="font-bold text-slate-900 text-lg">{currency}{flight.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {flights.length > 3 && (
                    <button
                        onClick={() => setShowAllFlights(!showAllFlights)}
                        className="mt-3 w-full py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center justify-center"
                    >
                        {showAllFlights ? (
                            <>
                                <ChevronUp className="h-4 w-4 mr-1" />
                                Show Less
                            </>
                        ) : (
                            <>
                                <ChevronDown className="h-4 w-4 mr-1" />
                                Show All {flights.length} Flights
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Hotels Section */}
            <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                    🏨 Available Hotels ({hotels.length} options)
                </h3>
                <div className="space-y-3">
                    {displayedHotels.map((hotel) => (
                        <div
                            key={hotel.id}
                            onClick={() => onSelectHotel(hotel.id)}
                            className={`bg-white p-4 rounded-lg shadow-sm border-2 cursor-pointer transition-all ${selectedHotel === hotel.id
                                    ? 'border-indigo-500 bg-indigo-50'
                                    : 'border-slate-200 hover:border-indigo-300'
                                }`}
                        >
                            <div className="flex flex-col sm:flex-row gap-4 items-start">
                                <Image
                                    src={hotel.img}
                                    className="h-16 w-16 rounded-lg object-cover"
                                    alt={hotel.name}
                                    width={64}
                                    height={64}
                                />
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900">{hotel.name}</h4>
                                    <p className="text-slate-500 text-xs">{hotel.location}</p>
                                    <div className="flex items-center text-yellow-500 text-sm mt-1">
                                        <Star className="h-3 w-3 fill-current" />
                                        <span className="ml-1 text-slate-600">{hotel.rating}/5.0</span>
                                    </div>
                                    <p className="text-slate-400 text-xs mt-1">
                                        {hotel.amenities.slice(0, 3).join(' • ')}
                                    </p>
                                </div>
                                <div className="text-right">
                                    {selectedHotel === hotel.id && (
                                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-1">
                                            <Check className="h-3 w-3 mr-1" />
                                            Selected
                                        </div>
                                    )}
                                    <p className="font-bold text-slate-900 text-lg">{currency}{hotel.price}</p>
                                    <p className="text-xs text-slate-500">per night</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {hotels.length > 3 && (
                    <button
                        onClick={() => setShowAllHotels(!showAllHotels)}
                        className="mt-3 w-full py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center justify-center"
                    >
                        {showAllHotels ? (
                            <>
                                <ChevronUp className="h-4 w-4 mr-1" />
                                Show Less
                            </>
                        ) : (
                            <>
                                <ChevronDown className="h-4 w-4 mr-1" />
                                Show All {hotels.length} Hotels
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
