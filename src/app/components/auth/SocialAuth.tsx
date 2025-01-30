// components/auth/SocialAuth.tsx
import Button from '../ui/Button';

const SocialAuth = () => {
    return (
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">O continúa con</span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="ghost" className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        {/* Icono Google */}
                    </svg>
                    Google
                </Button>

                <Button variant="ghost" className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        {/* Icono GitHub */}
                    </svg>
                    GitHub
                </Button>
            </div>
        </div>
    );
};

export default SocialAuth;