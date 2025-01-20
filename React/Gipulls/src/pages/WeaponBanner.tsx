// WeaponBanner.tsx
import React, { useState, useEffect } from 'react';
import { PullResult } from '../types';
import { getAllWeapons, getRandomWeapon } from '../utils'; // We only need weapons for the Weapon Banner
import History from '../components/History';
import PullTracker from '../components/PullTracker';
import PullResultDisplay from '../components/PullResults';
import { Link } from 'react-router-dom';

export const WeaponBanner: React.FC = () => {
    const [pullResult, setPullResult] = useState<PullResult | null>(null);
    const [previousPull, setPreviousPull] = useState<PullResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [wishCount, setWishCount] = useState<number>(0);
    const [pullHistory, setPullHistory] = useState<PullResult[]>([]);
    const [primogems, setPrimogems] = useState<number>(32000); // Default value if not found in localStorage
    const [isPulling, setIsPulling] = useState<boolean>(false);
    const [showHistory, setShowHistory] = useState<boolean>(false);
    // Pity counters for WeaponBanner
    const [fourStarPity, setFourStarPity] = useState<number>(0); // 4-star pity counter (2 margin difference)
    const [fiveStarPity, setFiveStarPity] = useState<number>(0); // 5-star pity counter (2 margin difference)
    const pullCost = 160;

    // Fetch primogems from localStorage on component mount
    useEffect(() => {
        const storedPrimogems = localStorage.getItem('primogems');
        console.log('Fetched primogems from localStorage:', storedPrimogems); // Debugging line

        if (storedPrimogems) {
            setPrimogems(Number(storedPrimogems)); // Parse and set primogems if it exists in localStorage
        }
    }, []);

    // Update localStorage whenever primogems state changes
    useEffect(() => {
        console.log('Updating primogems in localStorage:', primogems); // Debugging line
        localStorage.setItem('primogems', primogems.toString());
    }, [primogems]);

    // State to store all weapons
    const [allWeapons, setAllWeapons] = useState<PullResult[]>([]);

    // Fetch all weapons on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const weapons = await getAllWeapons();
                if (weapons) {
                    setAllWeapons(weapons);
                }
            } catch (err) {
                console.error('Error fetching weapons:', err);
            }
        };

        fetchData();
    }, []);

    // Combined counters for 3-star, 4-star, and 5-star
    const [rarityCounters, setRarityCounters] = useState({
        threeStar: 0,
        fourStar: 0,
        fiveStar: 0,
    });

    // Simulate a pull (Wish) with pity system for Weapon Banner
    const pullWish = async (): Promise<void> => {
        if (primogems < pullCost || isPulling) {
            setError("Not enough Primogems or already pulling!");
            return;
        }

        setIsPulling(true);
        setError(null);
        setPrimogems(prev => prev - pullCost); // Decrease primogems after a pull
        setWishCount((prevCount) => prevCount + 1);

        let itemData: PullResult | null = null;

        // Increment pity counters for Weapon Banner
        setFourStarPity((prev) => prev + 1);  
        setFiveStarPity((prev) => prev + 1); // Increment by 2 for 5-star pity

        // Handle pity system for 5-star (80 pulls without 5-star)
      
          // Handle pity system for 4-star (10 pulls without 4-star)
          if (fourStarPity >= 9) {
            itemData = await getRandomWeapon(4); // Get a 4-star weapon
            setFourStarPity(0); // Reset 4-star pity after guaranteed 4-star pull
            if (fiveStarPity == 79) {
                itemData = await getRandomWeapon(5); // Get a 5-star weapon
                setFiveStarPity(0); // Reset 5-star pity after guaranteed 5-star pull
            }
        }
        // Regular pulls based on probability
        else {
            const pullOutcome = Math.random() * 100; // Generate a random number between 0 and 100
            if (pullOutcome <= 0.07) {
                itemData = await getRandomWeapon(5); // Fetch a 5-star weapon
            } else if (pullOutcome > 0.07 && pullOutcome <= 5.17) {
                itemData = await getRandomWeapon(4); // Fetch a 4-star weapon
            } else {
                itemData = await getRandomWeapon(3); // Fetch a 3-star weapon
            }
        }

        if (itemData) {
            setPreviousPull(pullResult); // Set the current pull as the previous one
            setPullResult(itemData);
            setPullHistory((prevHistory) => {
                const newHistory = [itemData, ...prevHistory];
                return newHistory.slice(-250); // Keep only the last 250 pulls
            });

            // Update the combined rarity counters
            const rarity = parseInt(itemData.rarity);
            setRarityCounters((prevCounters) => {
                if (rarity === 3) {
                    return { ...prevCounters, threeStar: prevCounters.threeStar + 1 }; // Increment 3-star counter for 1, 2, and 3-star weapons
                } else if (rarity === 4) {
                    return { ...prevCounters, fourStar: prevCounters.fourStar + 1 };
                } else if (rarity === 5) {
                    return { ...prevCounters, fiveStar: prevCounters.fiveStar + 1 };
                }
                return prevCounters;
            });
        }

        setIsPulling(false); // Enable the button after the pull is done
    };

    // Function to determine the background color based on rarity
    const getBorderColor = (rarity: number) => {
        switch (rarity) {
            case 5:
                return 'bg-yellow-500 border-4 border-yellow-700 shadow-[0_0_10px_4px_rgba(255,223,0,0.7)]'; // 5-star (gold/yellow)
            case 4:
                return 'bg-purple-500 border-4 border-purple-700 shadow-[0_0_10px_4px_rgba(128,0,128,0.7)]'; // 4-star (purple)
            case 3:
                return 'bg-blue-500 border-4 border-blue-700 shadow-[0_0_10px_4px_rgba(0,0,255,0.7)]'; // 3-star (blue)
            default:
                return 'bg-green-500 border-4 border-green-700 shadow-[0_0_10px_4px_rgba(0,255,0,0.7)]'; // 1- and 2-star (green)
        }
    };

    // Toggle history display
    const toggleHistory = () => {
        setShowHistory((prevState) => !prevState);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Full-screen background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: 'url("https://pa1.narvii.com/7742/e2079410e35198a15a6547222b38feefa188c800r1-960-539_hq.gif")',
                }}
            ></div>

            {/* Main content wrapper */}
            <div className="relative flex flex-col justify-start items-center w-full h-full bg-black bg-opacity-60 overflow-hidden">
                {/* Pull Tracker Component */}
                <PullTracker
                    primogems={primogems}
                    wishCount={wishCount}
                    rarityCounters={rarityCounters} // Pass the rarityCounters for tracking
                    fourStarPity={fourStarPity}
                    fiveStarPity={fiveStarPity}
                />

                {/* Pull Results */}
                <div className="text-center p-8 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 mb-auto">
                    <h1 className="text-4xl font-bold mb-8 text-white">Genshin Impact Wish Simulator</h1>
                    <h2 className="text-4xl font-bold mb-8 text-white">Weapon Banner</h2>

                    {/* Pull button moved to the right side */}
                    <div className="absolute right-10 bottom-24">
                        <button
                            onClick={pullWish}
                            className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform"
                            disabled={primogems < pullCost || isPulling}
                        >
                            {isPulling ? (
                                <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-blue-600 rounded-full"></div>
                            ) : (
                                `Pull (Cost: ${pullCost} Primogems)`
                            )}
                        </button>
                    </div>

                    {error && <div className="mt-4 text-red-500 font-semibold">{error}</div>}

                    {/* Display pull results using PullResultDisplay */}
                    {pullResult && (
                        <PullResultDisplay
                            pullResult={pullResult}
                            previousPull={previousPull}
                            getBorderColor={getBorderColor}
                        />
                    )}
                </div>
                <nav className="bg-white p-4 rounded-lg shadow-lg mb-6">
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                to="/standard-banner"
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
                            >
                                Standard Banner
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/weapon-banner"
                                className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-slate-600"
                            >
                                Weapon Banner
                            </Link>
                        </li>
                    </ul>
                </nav>
                {/* History Component */}
                <History
                    pullHistory={pullHistory}
                    showHistory={showHistory}
                    toggleHistory={toggleHistory}
                    getBorderColor={getBorderColor}
                />
            </div>
        </div>
    );
};
