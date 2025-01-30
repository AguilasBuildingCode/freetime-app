// components/ui/Alert.tsx
import React from 'react';

type AlertProps = {
  type: 'success' | 'error';
  message: string;
};

const Alert = ({ type, message }: AlertProps) => {
  return (
    <div className={`rounded-md p-4 ${type === 'error' ? 'bg-red-50' : 'bg-green-50'} mb-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {type === 'error' ? (
            <svg
              className="h-5 w-5 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${type === 'error' ? 'text-red-800' : 'text-green-800'}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alert;