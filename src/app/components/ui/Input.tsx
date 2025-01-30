// components/ui/Input.tsx
import React, { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  variant?: 'primary' | 'outline';
  showStrength?: boolean;
  value?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    variant = 'primary',
    className = '',
    showStrength = false,
    value,
    ...props
  }, ref) => {
    const variants = {
      primary: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
      outline: 'border-2 border-gray-200 focus:border-black focus:ring-0'
    };

    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>}
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-lg transition-all ${variants[variant]} ${className} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
            }`}
          value={value}
          {...props}
        />
        {showStrength && (
          <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${Math.min((value?.length || 0) * 10, 100)}%` }}
            />
          </div>
        )}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;