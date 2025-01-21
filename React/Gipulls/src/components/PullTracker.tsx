import React from 'react';

interface PullTrackerProps {
    primogems: number;
    wishCount: number;
    rarityCounters: {
        threeStar: number;
        fourStar: number;
        fiveStar: number;
    };
    fourStarPity: number;
    fiveStarPity: number;
}

const PullTracker: React.FC<PullTrackerProps> = ({
    primogems,
    wishCount,
    rarityCounters,
    fourStarPity,
    fiveStarPity
}) => {
    return (
        <div className="fixed top-5 sm:top-0 right-1 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-xs">
            <div className="text-xl mb-4 text-white">
                Primogems: {primogems}
            </div>
            <h2 className="text-xl font-bold">Pull Tracker</h2>
            <div className="text-xl mb-4 text-white">
                Number of pulls: {wishCount}
            </div>

            <p>3-Star and below: {rarityCounters.threeStar}</p>
            <p>4-Star: {rarityCounters.fourStar}</p>
            <p>5-Star: {rarityCounters.fiveStar}</p>
            <p>4-Star Pity: {fourStarPity}/10</p>
            <p>5-Star Pity: {fiveStarPity}/80</p>
        </div>
    );
};

export default PullTracker;
