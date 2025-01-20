import React from 'react';

interface PullButtonProps {
    isPulling: boolean;
    pullCost: number;
    primogems: number;
    onClick: () => void;
}

const PullButton: React.FC<PullButtonProps> = ({ isPulling, pullCost, primogems, onClick }) => {
    return (
        <div className="absolute right-16 bottom-40">
            <button
                onClick={onClick}
                className={`bg-gradient-to-r from-red-500 via-blue-600 to-blue-700 hover:scale-105 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform relative flex items-center justify-center w-auto ${isPulling ? 'animate-bounce' : ''}`}
                disabled={primogems < pullCost || isPulling}
            >
                {isPulling ? (
                    <span>Pull (Cost 160 Primogems)</span>
                ) : (
                    `Pull (Cost: ${pullCost} Primogems)`
                )}
            </button>
        </div>
    );
};

export default PullButton;
