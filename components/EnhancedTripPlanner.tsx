'use client';

import { useState, useEffect } from 'react';
import EnhancedTripInput from './EnhancedTripInput';
import LoadingState from './LoadingState';
import TripResults from './TripResults';
import { TripData } from '@/data/destinations';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
    departureAirport: string;
    destination: string;
    tripType: 'one-way' | 'return';
    duration: string;
    additionalInfo: string;
}

export default function EnhancedTripPlanner() {
    const [status, setStatus] = useState<Status>('idle');
    const [formData, setFormData] = useState<FormData>({
        departureAirport: '',
        destination: '',
        tripType: 'return',
        duration: '7',
        additionalInfo: ''
    });
    const [tripData, setTripData] = useState<TripData | null>(null);
    const [loadingMessage, setLoadingMessage] = useState('Analyzing your request...');
    const [error, setError] = useState<string | null>(null);

    const loadingMessages = [
        "Consulting AI travel assistant...",
        "Searching flight databases...",
        "Finding best hotel options...",
        "Calculating optimal pricing...",
        "Finalizing your itinerary..."
    ];

    useEffect(() => {
        if (status === 'loading') {
            let messageIndex = 0;
            const interval = setInterval(() => {
                setLoadingMessage(loadingMessages[messageIndex]);
                messageIndex = (messageIndex + 1) % loadingMessages.length;
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [status]);

    const handleFormChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleGenerate = async () => {
        setStatus('loading');
        setError(null);

        try {
            const response = await fetch('/api/generate-itinerary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to generate itinerary');
            }

            const data = await response.json();
            setTripData(data);
            setStatus('success');
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to generate itinerary. Please check your API key and try again.');
            setStatus('error');
        }
    };

    const handleReset = () => {
        setStatus('idle');
        setFormData({
            departureAirport: '',
            destination: '',
            tripType: 'return',
            duration: '7',
            additionalInfo: ''
        });
        setTripData(null);
        setError(null);
    };

    return (
        <div className="max-w-3xl mx-auto p-4 sm:p-6 mt-6 mb-20">
            <EnhancedTripInput
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

            {status === 'success' && tripData && (
                <TripResults tripData={tripData} onReset={handleReset} />
            )}
        </div>
    );
}
