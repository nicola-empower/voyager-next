import { NextRequest, NextResponse } from 'next/server';

// Helper to generate multiple flight options
function generateFlightOptions(
    departureAirports: string[],
    destination: string,
    departureDate: string,
    currency: string,
    numResults: number
): any[] {
    const airlines = ['British Airways', 'easyJet', 'Ryanair', 'Lufthansa', 'Air France', 'KLM', 'Emirates', 'Virgin Atlantic'];
    const classes = ['Economy', 'Premium Economy', 'Business'];
    const flights = [];

    for (let i = 0; i < numResults; i++) {
        const airport = departureAirports[i % departureAirports.length];
        const airline = airlines[i % airlines.length];
        const flightClass = i < 6 ? 'Economy' : i < 8 ? 'Premium Economy' : 'Business';

        // Generate realistic prices based on class
        let basePrice = 150;
        if (flightClass === 'Premium Economy') basePrice = 300;
        if (flightClass === 'Business') basePrice = 600;

        // Add variation
        const price = basePrice + (Math.random() * 100) - 50;

        // Convert currency
        let convertedPrice = price;
        if (currency === '€') convertedPrice = price * 1.2;
        if (currency === '$') convertedPrice = price * 1.3;

        const hour = 6 + Math.floor(Math.random() * 12);
        const minute = Math.floor(Math.random() * 60);
        const duration = 2 + Math.floor(Math.random() * 3);

        flights.push({
            id: `flight-${i}`,
            airline,
            route: `${airport.split('(')[0].trim()} to ${destination}`,
            time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} - ${String((hour + duration) % 24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
            price: Math.round(convertedPrice),
            class: flightClass,
            duration: `${duration}h ${Math.floor(Math.random() * 60)}m`
        });
    }

    // Sort by price
    return flights.sort((a, b) => a.price - b.price);
}

// Helper to generate multiple hotel options
function generateHotelOptions(
    destination: string,
    currency: string,
    numResults: number
): any[] {
    const hotelNames = [
        'CitizenM Hotel', 'Premier Inn', 'Holiday Inn Express', 'Hilton Garden Inn',
        'Marriott Hotel', 'Radisson Blu', 'Novotel', 'Ibis Styles',
        'Mercure Hotel', 'DoubleTree by Hilton'
    ];

    const locations = ['City Center', 'Near Station', 'Business District', 'Historic Quarter', 'Waterfront'];
    const hotels = [];

    for (let i = 0; i < numResults; i++) {
        const name = hotelNames[i % hotelNames.length];
        const location = locations[i % locations.length];

        // Generate realistic prices
        const basePrice = 80 + (i * 15);
        let convertedPrice = basePrice;
        if (currency === '€') convertedPrice = basePrice * 1.2;
        if (currency === '$') convertedPrice = basePrice * 1.3;

        const rating = (4.0 + (Math.random() * 1.0)).toFixed(1);

        hotels.push({
            id: `hotel-${i}`,
            name: `${name} ${destination}`,
            location,
            rating,
            price: Math.round(convertedPrice),
            amenities: ['WiFi', 'Breakfast', 'Air Conditioning', '24h Reception', 'Gym'].slice(0, 3 + Math.floor(Math.random() * 3)),
            img: `https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80`
        });
    }

    // Sort by rating (descending) then price (ascending)
    return hotels.sort((a, b) => {
        const ratingDiff = parseFloat(b.rating) - parseFloat(a.rating);
        if (Math.abs(ratingDiff) > 0.2) return ratingDiff;
        return a.price - b.price;
    });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            departureAirports,
            destination,
            tripType,
            departureDate,
            returnDate,
            duration,
            currency,
            numResults,
            additionalInfo
        } = body;

        console.log('Received advanced request:', {
            departureAirports,
            destination,
            departureDate,
            currency,
            numResults
        });

        if (!departureAirports || departureAirports.length === 0) {
            return NextResponse.json(
                { error: 'At least one departure airport is required' },
                { status: 400 }
            );
        }

        if (!departureDate) {
            return NextResponse.json(
                { error: 'Departure date is required' },
                { status: 400 }
            );
        }

        const cityName = destination || 'Paris';
        const selectedCurrency = currency || '£';
        const resultsCount = Math.min(numResults || 10, 20); // Max 20 results

        // Generate multiple flight options
        const flights = generateFlightOptions(
            departureAirports,
            cityName,
            departureDate,
            selectedCurrency,
            resultsCount
        );

        // Generate multiple hotel options
        const hotels = generateHotelOptions(
            cityName,
            selectedCurrency,
            resultsCount
        );

        const response = {
            flights,
            hotels,
            searchParams: {
                destination: cityName,
                departureDate,
                returnDate,
                tripType,
                currency: selectedCurrency,
                departureAirports
            }
        };

        console.log(`Generated ${flights.length} flights and ${hotels.length} hotels`);
        return NextResponse.json(response);

    } catch (error) {
        console.error('Error generating itinerary:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error details:', errorMessage);

        return NextResponse.json(
            {
                error: 'Failed to generate itinerary',
                details: errorMessage
            },
            { status: 500 }
        );
    }
}
