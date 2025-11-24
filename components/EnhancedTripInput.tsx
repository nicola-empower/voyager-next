import { Sparkles, Plane, Calendar, MapPin } from 'lucide-react';

interface EnhancedTripInputProps {
    formData: {
        departureAirport: string;
        destination: string;
        tripType: 'one-way' | 'return';
        duration: string;
        additionalInfo: string;
    };
    onFormChange: (field: string, value: string) => void;
    onGenerate: () => void;
    disabled: boolean;
}

export default function EnhancedTripInput({ formData, onFormChange, onGenerate, disabled }: EnhancedTripInputProps) {
    return (
        <div className="transition-all duration-500 ease-in-out" style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
                <h1 className="text-2xl font-bold text-slate-900">Plan Your Journey</h1>
                <p className="mt-1 text-slate-500">Enter your travel details and we&apos;ll find the best options for you.</p>

                <div className="mt-6 space-y-4">
                    {/* Departure Airport */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <Plane className="inline h-4 w-4 mr-1" />
                            Departure Airport(s)
                        </label>
                        <input
                            type="text"
                            className="block w-full rounded-lg border-slate-300 bg-slate-50 p-3 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 shadow-inner text-base transition-colors"
                            placeholder="e.g. London Heathrow, Manchester"
                            value={formData.departureAirport}
                            onChange={(e) => onFormChange('departureAirport', e.target.value)}
                        />
                    </div>

                    {/* Destination */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <MapPin className="inline h-4 w-4 mr-1" />
                            Destination (Optional)
                        </label>
                        <input
                            type="text"
                            className="block w-full rounded-lg border-slate-300 bg-slate-50 p-3 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 shadow-inner text-base transition-colors"
                            placeholder="e.g. Paris, New York, or leave blank for AI suggestions"
                            value={formData.destination}
                            onChange={(e) => onFormChange('destination', e.target.value)}
                        />
                    </div>

                    {/* Trip Type and Duration */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <Calendar className="inline h-4 w-4 mr-1" />
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
                                Duration (days)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="30"
                                className="block w-full rounded-lg border-slate-300 bg-slate-50 p-3 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 shadow-inner text-base transition-colors"
                                placeholder="e.g. 7"
                                value={formData.duration}
                                onChange={(e) => onFormChange('duration', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Additional Information
                        </label>
                        <textarea
                            rows={3}
                            className="block w-full rounded-lg border-slate-300 bg-slate-50 p-3 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 shadow-inner text-base resize-none transition-colors"
                            placeholder="e.g. Budget £700, prefer morning flights, need hotel near city center"
                            value={formData.additionalInfo}
                            onChange={(e) => onFormChange('additionalInfo', e.target.value)}
                        />
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={onGenerate}
                        disabled={!formData.departureAirport}
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate AI-Powered Itinerary
                    </button>
                </div>
            </div>
        </div>
    );
}
