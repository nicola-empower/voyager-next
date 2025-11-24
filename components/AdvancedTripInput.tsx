'use client';

import { Sparkles, Plane, Calendar, MapPin, DollarSign } from 'lucide-react';

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

interface AdvancedTripInputProps {
    formData: EnhancedFormData;
    onFormChange: (field: string, value: any) => void;
    onGenerate: () => void;
    disabled: boolean;
}

const POPULAR_AIRPORTS = [
    'London Heathrow (LHR)',
    'London Gatwick (LGW)',
    'Manchester (MAN)',
    'Birmingham (BHX)',
    'Edinburgh (EDI)',
    'Glasgow (GLA)'
];

export default function AdvancedTripInput({ formData, onFormChange, onGenerate, disabled }: AdvancedTripInputProps) {
    const minDate = new Date().toISOString().split('T')[0];

    const toggleAirport = (airport: string) => {
        const current = formData.departureAirports || [];
        if (current.includes(airport)) {
            onFormChange('departureAirports', current.filter(a => a !== airport));
        } else {
            onFormChange('departureAirports', [...current, airport]);
        }
    };

    return (
        <div className="transition-all duration-500 ease-in-out" style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
                <h1 className="text-2xl font-bold text-slate-900">Plan Your Perfect Journey</h1>
                <p className="mt-1 text-slate-500">Select your preferences and we&apos;ll find the best options for you.</p>

                <div className="mt-6 space-y-5">
                    {/* Departure Airports - Multiple Selection */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <Plane className="inline h-4 w-4 mr-1" />
                            Departure Airport(s) - Select one or more
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {POPULAR_AIRPORTS.map((airport) => (
                                <label key={airport} className="flex items-center p-2 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={formData.departureAirports?.includes(airport) || false}
                                        onChange={() => toggleAirport(airport)}
                                        className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                                    />
                                    <span className="text-sm text-slate-700">{airport}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Destination */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <MapPin className="inline h-4 w-4 mr-1" />
                            Destination (Optional - leave blank for AI suggestions)
                        </label>
                        <input
                            type="text"
                            className="block w-full rounded-lg border-slate-300 bg-slate-50 p-3 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 shadow-inner text-base transition-colors"
                            placeholder="e.g. Paris, New York, Tokyo"
                            value={formData.destination}
                            onChange={(e) => onFormChange('destination', e.target.value)}
                        />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <Calendar className="inline h-4 w-4 mr-1" />
                                Departure Date
                            </label>
                            <input
                                type="date"
                                min={minDate}
                                className="block w-full rounded-lg border-slate-300 bg-slate-50 p-3 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 shadow-inner text-base transition-colors"
                                value={formData.departureDate}
                                onChange={(e) => onFormChange('departureDate', e.target.value)}
                            />
                        </div>

                        {formData.tripType === 'return' && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Return Date
                                </label>
                                <input
                                    type="date"
                                    min={formData.departureDate || minDate}
                                    className="block w-full rounded-lg border-slate-300 bg-slate-50 p-3 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 shadow-inner text-base transition-colors"
                                    value={formData.returnDate}
                                    onChange={(e) => onFormChange('returnDate', e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    {/* Trip Type and Currency */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Trip Type
                            </label>
                            <select
                                className="block w-full rounded-lg border-slate-300 bg-slate-50 p-3 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 shadow-inner text-base transition-colors"
                                value={formData.tripType}
                                onChange={(e) => onFormChange('tripType', e.target.value)}
                            >
                                <option value="return">Return</option>
                                <option value="one-way">One-way</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <DollarSign className="inline h-4 w-4 mr-1" />
                                Currency
                            </label>
                            <select
                                className="block w-full rounded-lg border-slate-300 bg-slate-50 p-3 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 shadow-inner text-base transition-colors"
                                value={formData.currency}
                                onChange={(e) => onFormChange('currency', e.target.value)}
                            >
                                <option value="£">GBP (£)</option>
                                <option value="€">EUR (€)</option>
                                <option value="$">USD ($)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Results to Show
                            </label>
                            <input
                                type="number"
                                min="5"
                                max="20"
                                className="block w-full rounded-lg border-slate-300 bg-slate-50 p-3 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 shadow-inner text-base transition-colors"
                                value={formData.numResults}
                                onChange={(e) => onFormChange('numResults', parseInt(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Additional Preferences
                        </label>
                        <textarea
                            rows={2}
                            className="block w-full rounded-lg border-slate-300 bg-slate-50 p-3 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 shadow-inner text-base resize-none transition-colors"
                            placeholder="e.g. Prefer morning flights, need hotel near attractions, budget constraints"
                            value={formData.additionalInfo}
                            onChange={(e) => onFormChange('additionalInfo', e.target.value)}
                        />
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={onGenerate}
                        disabled={!formData.departureAirports || formData.departureAirports.length === 0 || !formData.departureDate}
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <Sparkles className="mr-2 h-5 w-5" />
                        Search {formData.numResults} Best Options
                    </button>

                    {(!formData.departureAirports || formData.departureAirports.length === 0 || !formData.departureDate) && (
                        <p className="text-sm text-red-600 text-center">Please select at least one airport and a departure date</p>
                    )}
                </div>
            </div>
        </div>
    );
}
