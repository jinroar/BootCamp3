import React from 'react';
import { PullResult } from '../types';

interface PullResultDisplayProps {
    pullResult: PullResult | null; // Allow null for pullResult
    getBorderColor: (rarity: number) => string;
}

const PullResults: React.FC<PullResultDisplayProps> = ({ pullResult, getBorderColor }) => {
    // If pullResult is null, return null (don't render anything)
    if (!pullResult) return null;

    // Replace dashes with spaces for the ID
    const formattedId = pullResult.id.replace(/-/g, ' ');

    const renderStars = () => {
        const starCount = parseInt(pullResult.rarity); // Number of stars based on rarity
        const stars = Array.from({ length: starCount }, (_, index) => (
            <span
                key={`${pullResult.id}-${index}`} // Unique key for each star based on id and index
                className="animate-move-stars inline-block text-yellow-400 text-3xl ml-2"
                style={{ animationDelay: `${index * 0.2}s` }} // Dynamically set the delay for each star
            >
                ⭐
            </span>
        ));
        return stars;
    };

    return (
        <div className="bg-gray-700 rounded-lg shadow-md ">
            {/* Render stars with animation */}
            <div className="flex justify-center space-x-6  ">
                {/* Container that holds both image and description */}
                <div className="flex-shrink-0 w-60 p-6">
                    {/* Box behind the image with dynamic background color based on rarity */}
                    <div
                        className={`p-4 rounded-lg ${getBorderColor(parseInt(pullResult.rarity))} animate-highlight-draw`}
                    >
                        <img
                            src={pullResult.image || "https://i.kym-cdn.com/entries/icons/mobile/000/049/004/lebronsunshinecover.jpg"}
                            alt={pullResult.id}
                            className="w-full h-full object-contain"
                        />

                    </div>
                </div>
                {/* Description with the same width and height as the image */}
                <div className="flex-shrink-0 w-3/6 h-1/2 p-6">
                    <div className="mt-4 bg-opacity-80 bg-gray-900 rounded-lg shadow-lg h-full">
                        <p className=" mb-4 text-center text-white text-lg font-bold tracking-wide uppercase">
                            {formattedId}
                        </p>
                        <p className="text-white text-center text-sm font-semibold tracking-wide px-2 max-h-full overflow-y-auto">
                            {pullResult.description}
                        </p>
                        <h3 className="text-2xl font-bold text-center text-white tracking-wide font-serif">
                            {/* Display animated stars */}
                            {renderStars()} 
                        </h3>
                        <h3 className="text-2xl font-bold text-center text-white tracking-wide font-serif">
                        {pullResult.type}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PullResults;