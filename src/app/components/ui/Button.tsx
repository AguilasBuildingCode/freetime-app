// components/ui/Button.tsx
import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
};

const Button = ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    children,
    ...props
}: ButtonProps) => {
    const baseStyles = 'flex items-center justify-center rounded-lg font-medium transition-colors';

    const variants = {
        primary: `bg-blue-600 text-white 
              hover:bg-blue-700 
              disabled:bg-gray-400 disabled:text-gray-200 
              disabled:hover:bg-gray-400 disabled:pointer-events-none`,

        secondary: `bg-gray-200 text-gray-900 
                hover:bg-gray-300 
                disabled:bg-gray-400 disabled:text-gray-200 
                disabled:hover:bg-gray-400 disabled:pointer-events-none`,

        ghost: `bg-transparent text-gray-700 
            hover:bg-gray-50 
            disabled:text-gray-400 
            disabled:hover:bg-transparent disabled:pointer-events-none`
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    return (
        <button
            className={`${baseStyles} 
                  ${variants[variant]} 
                  ${sizes[size]} 
                  ${isLoading ? 'opacity-70 cursor-wait' : ''}
                  ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        {/* Loading spinner SVG */}
                    </svg>
                    Procesando...
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;