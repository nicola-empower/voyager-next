import { Plane, Star, Check } from 'lucide-react';
import Image from 'next/image';
import { TripData } from '@/data/destinations';

interface TripResultsProps {
    tripData: TripData;
    onReset: () => void;
}

export default function TripResults({ tripData, onReset }: TripResultsProps) {
    const totalCost = tripData.totalCost || (tripData.flights.price + (tripData.hotel.price * 2));

    return (
        <div className="mt-6 space-y-6">
            {/* Trip Summary Card */}
            <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                        <h2 className="text-2xl font-bold">Trip to {tripData.city}</h2>
                        {tripData.country && (
                            <p className="text-indigo-200 mt-1">{tripData.country}</p>
                        )}
                        <p className="text-indigo-200 mt-1">
                            {tripData.reasoning ? 'AI-powered recommendation' : 'Generated automatically'}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-indigo-200">Est. Total</p>
                        <p className="text-3xl font-bold">{tripData.currency}{totalCost}</p>
                    </div>
                </div>
                {tripData.reasoning && (
                    <div className="mt-4 pt-4 border-t border-indigo-500">
                        <p className="text-sm text-indigo-100">
                            <strong>Why this recommendation:</strong> {tripData.reasoning}
                        </p>
                    </div>
                )}
            </div>

            {/* Flight Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 items-center">
                <div className="p-3 bg-sky-50 rounded-full text-sky-600">
                    <Plane className="h-6 w-6" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-slate-900">{tripData.flights.airline}</h3>
                    <p className="text-slate-500 text-sm">
                        {tripData.flights.route || 'Outbound'} • {tripData.flights.time}
                    </p>
                    {tripData.flights.class && (
                        <p className="text-slate-400 text-xs mt-1">{tripData.flights.class}</p>
                    )}
                </div>
                <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        In Policy
                    </span>
                    <p className="font-bold text-slate-900 mt-1">{tripData.currency}{tripData.flights.price}</p>
                </div>
            </div>

            {/* Hotel Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 items-center">
                <Image
                    src={tripData.img}
                    className="h-16 w-16 rounded-lg object-cover"
                    alt={tripData.city}
                    width={64}
                    height={64}
                />
                <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-slate-900">{tripData.hotel.name}</h3>
                    {tripData.hotel.location && (
                        <p className="text-slate-500 text-xs">{tripData.hotel.location}</p>
                    )}
                    <div className="flex items-center justify-center sm:justify-start text-yellow-500 text-sm mt-1">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="ml-1 text-slate-600">{tripData.hotel.rating}/5.0 rating</span>
                    </div>
                    {tripData.hotel.amenities && tripData.hotel.amenities.length > 0 && (
                        <p className="text-slate-400 text-xs mt-1">
                            {tripData.hotel.amenities.slice(0, 3).join(' • ')}
                        </p>
                    )}
                </div>
                <div className="text-right">
                    <p className="font-bold text-slate-900">{tripData.currency}{tripData.hotel.price}</p>
                    <p className="text-xs text-slate-500">per night</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
                <button
                    onClick={onReset}
                    className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                    Start Over
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-sm flex items-center transition-colors">
                    <Check className="h-4 w-4 mr-2" />
                    Approve &amp; Book
                </button>
            </div>
        </div>
    );
}
