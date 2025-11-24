'use client';

import { useState, useEffect } from 'react';
import AdvancedTripInput from './AdvancedTripInput';
import LoadingState from './LoadingState';
import MultipleOptionsDisplay from './MultipleOptionsDisplay';
import BookingConfirmation from './BookingConfirmation';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface EnhancedFormData {
    departureAirports: string[];
    destination: string;
    tripType: 'one-way' | 'return';
    departureDate: string;
    returnDate: string;
    duration: string;
    currency: '£' | '€' | '$';
    numResults: number;
    additionalInfo: string;
}

export default function AdvancedTripPlanner() {
    const [status, setStatus] = useState<Status>('idle');
    const [formData, setFormData] = useState<EnhancedFormData>({
        departureAirports: [],
        destination: '',
        tripType: 'return',
        departureDate: '',
        returnDate: '',
        duration: '7',
        currency: '£',
        numResults: 10,
        additionalInfo: ''
    });

    const [flights, setFlights] = useState<any[]>([]);
    const [hotels, setHotels] = useState<any[]>([]);
    const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
    const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
    const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Searching for flights...');
    const [error, setError] = useState<string | null>(null);

    const loadingMessages = [
        "Searching multiple airports...",
        "Finding best flight deals...",
        "Comparing hotel options...",
        "Calculating prices in your currency...",
        "Sorting results by value...",
        "Almost ready..."
    ];

    useEffect(() => {
        if (status === 'loading') {
            let messageIndex = 0;
            const interval = setInterval(() => {
                setLoadingMessage(loadingMessages[messageIndex]);
                messageIndex = (messageIndex + 1) % loadingMessages.length;
            }, 1200);

            return () => clearInterval(interval);
        }
    }, [status]);

    const handleFormChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleGenerate = async () => {
        setStatus('loading');
        setError(null);
        setFlights([]);
        setHotels([]);
        setSelectedFlight(null);
        setSelectedHotel(null);

        try {
            const response = await fetch('/api/generate-itinerary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to generate itinerary');
            }

            const data = await response.json();

            // Generate multiple flight and hotel options
            const flightOptions = data.flights || [];
            const hotelOptions = data.hotels || [];

            setFlights(flightOptions);
            setHotels(hotelOptions);

            // Auto-select first options
            if (flightOptions.length > 0) setSelectedFlight(flightOptions[0].id);
            if (hotelOptions.length > 0) setSelectedHotel(hotelOptions[0].id);

            setStatus('success');
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to generate itinerary. Please try again.');
            setStatus('error');
        }
    };

    const handleBooking = () => {
        if (!selectedFlight || !selectedHotel) {
            alert('Please select both a flight and a hotel before booking.');
            return;
        }
        setShowBookingConfirmation(true);
    };

    const handleReset = () => {
        setStatus('idle');
        setFlights([]);
        setHotels([]);
        setSelectedFlight(null);
        setSelectedHotel(null);
        setError(null);
    };

    const getSelectedFlight = () => flights.find(f => f.id === selectedFlight);
    const getSelectedHotel = () => hotels.find(h => h.id === selectedHotel);

    const calculateTotal = () => {
        const flight = getSelectedFlight();
        const hotel = getSelectedHotel();
        if (!flight || !hotel) return 0;

        const nights = formData.tripType === 'return' && formData.returnDate
            ? Math.ceil((new Date(formData.returnDate).getTime() - new Date(formData.departureDate).getTime()) / (1000 * 60 * 60 * 24))
            : parseInt(formData.duration) || 7;

        return flight.price + (hotel.price * nights);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 mt-6 mb-20">
            <AdvancedTripInput
                formData={formData}
                onFormChange={handleFormChange}
                onGenerate={handleGenerate}
                disabled={status === 'loading'}
            />

            {status === 'loading' && <LoadingState message={loadingMessage} />}

            {status === 'error' && error && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-medium">Error</p>
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                    <button
                        onClick={handleReset}
                        className="mt-3 px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {status === 'success' && flights.length > 0 && hotels.length > 0 && (
                <div className="mt-6 space-y-6">
                    <MultipleOptionsDisplay
                        flights={flights}
                        hotels={hotels}
                        currency={formData.currency}
                        selectedFlight={selectedFlight}
                        selectedHotel={selectedHotel}
                        onSelectFlight={setSelectedFlight}
                        onSelectHotel={setSelectedHotel}
                    />

                    {/* Selected Summary */}
                    {selectedFlight && selectedHotel && (
                        <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg">
                            <h3 className="text-xl font-bold mb-3">Your Selection</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-indigo-200 mb-1">Flight</p>
                                    <p className="font-medium">{getSelectedFlight()?.airline}</p>
                                    <p className="text-indigo-100">{formData.currency}{getSelectedFlight()?.price}</p>
                                </div>
                                <div>
                                    <p className="text-indigo-200 mb-1">Hotel</p>
                                    <p className="font-medium">{getSelectedHotel()?.name}</p>
                                    <p className="text-indigo-100">{formData.currency}{getSelectedHotel()?.price}/night</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-indigo-500">
                                <p className="text-2xl font-bold">
                                    Total: {formData.currency}{calculateTotal()}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handleReset}
                            className="px-6 py-3 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                        >
                            Start Over
                        </button>
                        <button
                            onClick={handleBooking}
                            disabled={!selectedFlight || !selectedHotel}
                            className="px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Approve &amp; Book
                        </button>
                    </div>
                </div>
            )}

            {/* Booking Confirmation Modal */}
            {showBookingConfirmation && selectedFlight && selectedHotel && (
                <BookingConfirmation
                    tripDetails={{
                        destination: formData.destination || 'Selected Destination',
                        departureDate: formData.departureDate,
                        returnDate: formData.tripType === 'return' ? formData.returnDate : undefined,
                        flight: getSelectedFlight(),
                        hotel: getSelectedHotel(),
                        currency: formData.currency,
                        totalCost: calculateTotal()
                    }}
                    onClose={() => setShowBookingConfirmation(false)}
                />
            )}
        </div>
    );
}
