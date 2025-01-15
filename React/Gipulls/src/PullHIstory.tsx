// PullHistory.tsx
import React from 'react';
import { PullResult } from './types';

type Props = {
    isVisible: boolean;
    history: PullResult[];
};

const PullHistory: React.FC<Props> = ({ isVisible, history }) => {
    if (!isVisible) return null;

    return (
        <div className="absolute top-28 left-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Pull History</h2>
            {history.length === 0 ? (
                <p>No pulls yet!</p>
            ) : (
                history.map((item, index) => (
                    <div key={index} className="mb-4">
                        <p>{item.rarity}-star {item.type} (ID: {item.id})</p>
                        <img src={item.image} alt={item.id} className="w-24 h-24 object-cover mt-2" />
                        <p className="text-sm">{item.description}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default PullHistory;
