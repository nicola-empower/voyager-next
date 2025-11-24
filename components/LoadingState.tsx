import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
    message: string;
}

export default function LoadingState({ message }: LoadingStateProps) {
    return (
        <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center py-4 text-indigo-600 animate-pulse font-medium">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                <span>{message}</span>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
                <div className="flex justify-between mb-4">
                    <div className="skeleton h-6 w-1/3"></div>
                    <div className="skeleton h-6 w-16"></div>
                </div>
                <div className="space-y-3">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-5/6"></div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
                <div className="flex justify-between mb-4">
                    <div className="skeleton h-6 w-1/4"></div>
                </div>
                <div className="flex gap-4">
                    <div className="skeleton h-20 w-20 rounded-lg"></div>
                    <div className="space-y-3 flex-1">
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-2/3"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
