// components/ui/Logo.tsx
import Link from 'next/link';

const Logo = ({ size = 'lg' }: { size?: 'sm' | 'lg' }) => {
  const sizes = {
    sm: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <Link href="/" className={`font-bold ${sizes[size]} text-blue-600 hover:text-blue-700 transition-colors`}>
      FreeTime
    </Link>
  );
};

export default Logo;