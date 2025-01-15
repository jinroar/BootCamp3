import React, { useState } from 'react';
import { PullResult } from "../types";
import { getRandomWeapon } from '../utils'; // Import utility functions

export const WeaponBanner: React.FC = () => {
    const [pullResult, setPullResult] = useState<PullResult | null>(null);
    const [previousPull, setPreviousPull] = useState<PullResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [primogems, setPrimogems] = useState<number>(32000); // Starting primogems
    const [isPulling, setIsPulling] = useState<boolean>(false); // Prevent multiple pulls
    const [fourStarPity, setFourStarPity] = useState<number>(0); // 4-star pity counter
    const [fiveStarPity, setFiveStarPity] = useState<number>(0); // 5-star pity counter
    const [pullHistory, setPullHistory] = useState<PullResult[]>([]); // Store pull history
    const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false); // Toggle for history visibility
    const pullCost = 160;

    const handlePullWish = async () => {
        if (primogems < pullCost || isPulling) {
            setError("Not enough Primogems or already pulling!");
            return;
        }

        setIsPulling(true);
        setError(null); // Reset any previous errors
        setPrimogems((prev) => prev - pullCost);

        let itemData: PullResult | null = null;

        // Increment pity counters
        setFourStarPity((prev) => prev + 1);
        setFiveStarPity((prev) => prev + 1);

        // Handle pity system for 4-star (10 pulls without 4-star)
        if (fourStarPity == 9) {
            itemData = await getRandomWeapon(4); // Fetch 4-star or higher weapon
            setFourStarPity(0); // Reset 4-star pity after guaranteed 4-star pull
        }
        // Handle pity system for 5-star (80 pulls without 5-star)
        else if (fiveStarPity >= 79) {
            itemData = await getRandomWeapon(5); // Fetch 5-star weapon
            setFiveStarPity(0); // Reset 5-star pity after guaranteed 5-star pull
        }
        // Regular pulls based on probability
        else {
            const pullOutcome = Math.random();
            if (pullOutcome < 0.93) {
                // 93% chance for 3-star weapon (includes 1 and 2-star)
                itemData = await getRandomWeapon(3); // Fetch 3-star or lower weapons
            }
            else if (pullOutcome < 0.98) {
                // 5% chance for 4-star weapon
                itemData = await getRandomWeapon(4);  // Fetch 4-star or lower weapon
            }
            else {
                // 2% chance for 5-star weapon
                itemData = await getRandomWeapon(5);  // Fetch 5-star weapon
            }
        }

        if (itemData) {
            setPreviousPull(pullResult); // Set the current pull as the previous one
            setPullResult(itemData);

            // Increment the appropriate counter based on the rarity
            const rarity = parseInt(itemData.rarity);
            if (rarity <= 3) {
                // Handle 3-star pulls
            } else if (rarity === 4) {
                // Handle 4-star pulls
            } else if (rarity === 5) {
                // Handle 5-star pulls
            }

            // Add the current pull to history
            setPullHistory((prevHistory) => [itemData, ...prevHistory]);
        }

        setIsPulling(false); // Enable the button after the pull is done
    };

    const toggleHistory = () => {
        setIsHistoryVisible(!isHistoryVisible);
    };

    return (
        <div className="min-h-screen flex justify-center items-center" style={{ backgroundImage: 'url("https://pa1.narvii.com/7742/e2079410e35198a15a6547222b38feefa188c800r1-960-539_hq.gif")', backgroundSize: 'cover', backgroundPosition: 'center' }}>

            {/* Primogem count UI */}
            <div className="absolute top-10 right-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                    <img src="https://example.com/primogem-icon.png" alt="Primogem Icon" className="w-8 h-8 mr-2" />
                    <span className="text-xl font-bold">Primogems: {primogems}</span>
                </div>
            </div>

            {/* History Button */}
            <div className="absolute top-10 left-10">
                <button 
                    onClick={toggleHistory} 
                    className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out transform"
                >
                    History
                </button>
            </div>

            {/* History Modal or List */}
            {isHistoryVisible && (
                <div className="absolute top-28 left-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">Pull History</h2>
                    {pullHistory.length === 0 ? (
                        <p>No pulls yet!</p>
                    ) : (
                        pullHistory.map((item, index) => (
                            <div key={index} className="mb-4">
                                <p>{item.rarity}-star {item.type} (ID: {item.id})</p>
                                <img src={item.image} alt={item.id} className="w-24 h-24 object-cover mt-2" />
                                <p className="text-sm">{item.description}</p>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Pull Tracker UI */}
            <div className="absolute top-28 right-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold">Pull Tracker</h2>
                <p>4-Star Pity: {fourStarPity}/10</p>
                <p>5-Star Pity: {fiveStarPity}/80</p>
            </div>

            {/* Pull Button */}
            <div className="absolute top-100 right-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                <button onClick={handlePullWish} className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform" disabled={primogems < pullCost || isPulling}>
                    Pull (Cost: {pullCost} Primogems)
                </button>
            </div>

            {/* Main Pull UI */}
            <div className="text-center p-8 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-8 text-white">Genshin Impact Wish Simulator</h1>
                <h2 className="text-4xl font-bold mb-8 text-white">Weapon Banner</h2>

                {error && <div className="mt-4 text-red-500 font-semibold">{error}</div>}

                {pullResult && (
                    <div className="mt-6 bg-gray-700 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-center text-white">
                            You've pulled a {pullResult.rarity}-star {pullResult.type}!
                        </h3>
                        <p className="mt-2 text-center text-white">ID: {pullResult.id}</p>
                        <div className="flex justify-center space-x-6 overflow-x-auto">
                            {/* Current Pull */}
                            <div className="flex-shrink-0 w-60">
                                <img src={pullResult.image} alt={pullResult.id} className="w-full h-60 object-cover mx-auto mt-4" />
                                <p className="mt-2 text-center text-white px-2 max-h-24 overflow-auto">{pullResult.description}</p>
                            </div>

                            {/* Previous pull */}
                            {previousPull && (
                                <div className="flex-shrink-0 w-60">
                                    <img
                                        src={previousPull.image}
                                        alt={previousPull.id}
                                        className="w-full h-60 object-cover mx-auto mt-4"
                                    />
                                    <p className="mt-2 text-center text-white px-2 max-h-24 overflow-auto">{previousPull.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
