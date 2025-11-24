import { Sparkles, Cpu } from 'lucide-react';

interface TripInputProps {
    inputText: string;
    onInputChange: (text: string) => void;
    onGenerate: () => void;
    disabled: boolean;
}

export default function TripInput({ inputText, onInputChange, onGenerate, disabled }: TripInputProps) {
    return (
        <div className="transition-all duration-500 ease-in-out" style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
                <h1 className="text-2xl font-bold text-slate-900">Where to next?</h1>
                <p className="mt-1 text-slate-500">Type your request below. Try &quot;Paris&quot;, &quot;London&quot;, or &quot;New York&quot;.</p>

                <div className="mt-6 relative">
                    <textarea
                        rows={4}
                        className="block w-full rounded-lg border-slate-300 bg-slate-50 p-4 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 shadow-inner text-base resize-none transition-colors"
                        placeholder="e.g. I need a flight to Paris for next week. Budget is roughly £700."
                        value={inputText}
                        onChange={(e) => onInputChange(e.target.value)}
                    />
                    <div className="absolute bottom-3 right-3">
                        <button
                            onClick={onGenerate}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
                        >
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Itinerary
                        </button>
                    </div>
                </div>

                <div className="mt-4 flex items-center text-xs text-slate-400">
                    <Cpu className="h-3 w-3 mr-1" />
                    <span>Natural Language Processing Active</span>
                </div>
            </div>
        </div>
    );
}
