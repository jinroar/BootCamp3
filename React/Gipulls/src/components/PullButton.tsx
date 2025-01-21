import React from 'react';

interface PullButtonProps {
    isPulling: boolean;
    pullCost: number;
    primogems: number;
    onClick: () => void;
}

const PullButton: React.FC<PullButtonProps> = ({ isPulling, pullCost, primogems, onClick }) => {
    return (
        <div className="fixed right-16 bottom-16 z-10 flex items-center justify-center">
            <button
                onClick={onClick}
                className={`cursor-pow bg-gradient-to-r from-red-500 via-blue to-blue-700 hover:scale-110 hover:from-blue-300 hover:to-red-600 text-white font-bold text-lg w-24 h-24 px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform relative flex items-center justify-center bg-opacity-80 ${isPulling ? 'animate-bounce' : ''}`}
                disabled={primogems < pullCost || isPulling}
            >
                {isPulling ? (
                    <span>Pull</span>
                ) : (
                    `Pull`
                )}
            </button>
        </div>
    );
};

export default PullButton;
