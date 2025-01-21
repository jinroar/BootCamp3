import React from 'react';
import { PullResult } from '../types';

interface HistoryProps {
    pullHistory: PullResult[];
    showHistory: boolean;
    toggleHistory: () => void;
    getBorderColor: (rarity: number) => string;
}

const History: React.FC<HistoryProps> = ({ pullHistory, showHistory, toggleHistory, getBorderColor }) => {
    return (
        <>
            {/* Show Pull History button on the left side */}
            <div className="fixed left-4 bottom-16 z-10 flex items-center justify-center">
                <button
                    onClick={toggleHistory}
                    className="cursor-pow bg-gradient-to-r from-gray-600 via-gray-500 to-gray-800 hover:scale-x-0 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-4 text-sm rounded-lg shadow-md mt-4 transition-all duration-300 ease-in-out transform"
                >
                    {showHistory ? 'Hide Pull History' : 'Show Pull History'}
                </button>
                {/* Counter for the number of pulls in history */}
                <span className="cursor-pow text-white text-lg font-semibold">
                    ({pullHistory.length})
                </span>
            </div>

            {/* Pull History */}
            {showHistory && pullHistory.length > 0 && (
                <div className="fixed left-1 top-16 bg-gray-700 p-4 rounded-lg shadow-md w-52 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 z-10">
                    <h3 className="text-xl font-semibold text-center text-white">Pull History</h3>
                    <div className="mt-4 space-y-4">
                        {pullHistory.map((item, index) => (
                            <div key={index} className="bg-gray-600 p-4 rounded-lg shadow-md">
                                <p className="text-center font-semibold text-white">{item.rarity}-star {item.type}</p>
                                <p className="text-center text-white">{item.id.toUpperCase()}</p>
                                {/* Box behind the image with dynamic background color based on rarity */}
                                <div className={` rounded-lg ${getBorderColor(parseInt(item.rarity))}`}>
                                    <img
                                        src={item.type === 'character'
                                            ? `https://genshin.jmp.blue/characters/${item.id.toLocaleLowerCase()}/icon`
                                            : `https://genshin.jmp.blue/weapons/${item.id.toLocaleLowerCase()}/icon`}
                                        alt={item.id}
                                        className="w-24 mx-auto mt-2"
                                    />
                                </div>
                                <p className="mt-2 text-white">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default History;
