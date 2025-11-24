'use client';

import { useState, useEffect } from 'react';
import TripInput from './TripInput';
import LoadingState from './LoadingState';
import TripResults from './TripResults';
import { destinations, TripData } from '@/data/destinations';

type Status = 'idle' | 'loading' | 'success';

export default function TripPlanner() {
    const [status, setStatus] = useState<Status>('idle');
    const [inputText, setInputText] = useState('I need to fly to London next week for a client meeting. Please find a hotel near the center.');
    const [tripData, setTripData] = useState<TripData | null>(null);
    const [loadingMessage, setLoadingMessage] = useState('Analysing request...');

    const loadingMessages = [
        "Scanning flight APIs...",
        "Checking hotel availability...",
        "Applying corporate policy...",
        "Finalising itinerary..."
    ];

    useEffect(() => {
        if (status === 'loading') {
            let messageIndex = 0;
            const interval = setInterval(() => {
                setLoadingMessage(loadingMessages[messageIndex]);
                messageIndex = (messageIndex + 1) % loadingMessages.length;
            }, 800);

            const timeout = setTimeout(() => {
                clearInterval(interval);
                setStatus('success');
            }, 3500);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [status]);

    const handleGenerate = () => {
        const text = inputText.toLowerCase();

        // Parse the input (simple AI simulation)
        let selectedTrip = destinations.london; // Default
        if (text.includes('paris') || text.includes('france')) {
            selectedTrip = destinations.paris;
        } else if (text.includes('york') || text.includes('nyc')) {
            selectedTrip = destinations.newyork;
        }

        setTripData(selectedTrip);
        setStatus('loading');
    };

    const handleReset = () => {
        setStatus('idle');
        setInputText('');
        setTripData(null);
    };

    return (
        <div className="max-w-3xl mx-auto p-4 sm:p-6 mt-6 mb-20">
            <TripInput
                inputText={inputText}
                onInputChange={setInputText}
                onGenerate={handleGenerate}
                disabled={status === 'loading'}
            />

            {status === 'loading' && <LoadingState message={loadingMessage} />}

            {status === 'success' && tripData && (
                <TripResults tripData={tripData} onReset={handleReset} />
            )}
        </div>
    );
}
