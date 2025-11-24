import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Project Voyager - Intelligent Demo',
    description: 'AI-powered travel planning assistant',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en-GB">
            <body className={`${inter.className} bg-slate-50 antialiased text-slate-900`}>
                {children}
            </body>
        </html>
    )
}
