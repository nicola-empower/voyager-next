import { PlaneTakeoff } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <PlaneTakeoff className="text-indigo-600 mr-2 h-6 w-6" />
                        <span className="font-bold text-lg tracking-tight">
                            Project Voyager{' '}
                            <span className="text-indigo-600 text-xs uppercase px-2 py-1 bg-indigo-50 rounded-full ml-2">
                                Beta
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-slate-500 hidden sm:inline">
                            Powered by Empower Digital
                        </span>
                        <Image
                            className="h-10 w-auto"
                            src="/empowerdigitallogo.jpg"
                            alt="Empower Digital"
                            width={120}
                            height={40}
                            priority
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
