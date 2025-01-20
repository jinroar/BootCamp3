// ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
    error: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    return error ? <div className="mt-4 text-red-500 font-semibold">{error}</div> : null;
};

export default ErrorMessage;
