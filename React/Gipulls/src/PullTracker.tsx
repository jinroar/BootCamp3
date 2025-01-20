// PullTracker.tsx
import React from 'react';

type Props = {
    threeStarCount: number;  // 3-star pulls count
    fourStarCount: number;   // 4-star pulls count
    fiveStarCount: number;   // 5-star pulls count
    fourStarPity: number;    // 4-star pity counter
    fiveStarPity: number;    // 5-star pity counter
};

const PullTracker: React.FC<Props> = ({
    threeStarCount,
    fourStarCount,
    fiveStarCount,
    fourStarPity,
    fiveStarPity
}) => (
    <div className="absolute top-28 right-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">Pull Tracker</h2>
        <p>3-Star: {threeStarCount}</p>
        <p>4-Star: {fourStarCount}</p>
        <p>5-Star: {fiveStarCount}</p>
        <p>4-Star Pity: {fourStarPity}/10</p>
        <p>5-Star Pity: {fiveStarPity}/80</p>
    </div>
);

export default PullTracker;
