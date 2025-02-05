// components/Navbar.tsx
'use client'; // Mark as client component if using interactivity
import Link from 'next/link';
import { FaUser, FaSignInAlt } from 'react-icons/fa';

export default function Navbar() {
    return (
        <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-sm border-b z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        Freetime
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/login"
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <FaUser className="w-4 h-4" />
                            <span className="hidden sm:inline">Login</span>
                        </Link>
                        <Link
                            href="/signup"
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                        >
                            <FaSignInAlt className="w-4 h-4" />
                            <span>Sign Up</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}