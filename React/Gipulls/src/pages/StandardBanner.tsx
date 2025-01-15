import React, { useState, useEffect } from 'react';
import { PullResult } from '../types';
import { getAllCharacters, getAllWeapons, getRandomWeapon, getRandomCharacter } from '../utils';


export const StandardBanner: React.FC = () => {
    const [pullResult, setPullResult] = useState<PullResult | null>(null);
    const [previousPull, setPreviousPull] = useState<PullResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [wishCount, setWishCount] = useState<number>(0);
    const [pullHistory, setPullHistory] = useState<PullResult[]>([]);
    const [showHistory, setShowHistory] = useState<boolean>(false);
    const [primogems, setPrimogems] = useState<number>(32000); // Starting primogems
    const [isPulling, setIsPulling] = useState<boolean>(false); // To prevent multiple pulls
    const pullCost = 160;

    // Pity counters
    const [fourStarPity, setFourStarPity] = useState<number>(0); // 4-star pity counter
    const [fiveStarPity, setFiveStarPity] = useState<number>(0); // 5-star pity counter

    // Combined counters for 1-star, 2-star, 3-star, 4-star, and 5-star
    const [rarityCounters, setRarityCounters] = useState({
        threeStar: 0, // 1-star, 2-star, and 3-star weapons count as 3-star
        fourStar: 0,
        fiveStar: 0
    });

    // State to store all characters and weapons
    const [allCharacters, setAllCharacters] = useState<PullResult[]>([]);
    const [allWeapons, setAllWeapons] = useState<PullResult[]>([]);

    // Fetch all characters and weapons on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const characters = await getAllCharacters();
                const weapons = await getAllWeapons();

                if (characters) {
                    setAllCharacters(characters);
                }

                if (weapons) {
                    setAllWeapons(weapons);
                }
            } catch (err) {
                console.error("Error fetching initial data:", err);
            }
        };

        fetchData();
    }, []);

    // Simulate a pull (Wish) with pity system
    const pullWish = async (): Promise<void> => {
        if (primogems < pullCost || isPulling) {
            setError("Not enough Primogems or already pulling!");
            return;
        }

        setIsPulling(true); // Prevent multiple pulls
        setError(null); // Reset any previous errors
        setPrimogems((prev) => prev - pullCost);
        setWishCount((prevCount) => prevCount + 1);

        let itemData: PullResult | null = null;

        // Increment pity counters
        setFourStarPity((prev) => prev + 1);
        setFiveStarPity((prev) => prev + 1);

        // Handle pity system for 4-star (10 pulls without 4-star)
        if (fourStarPity == 9 || (fiveStarPity == 0 && fourStarPity == 9)) {
            // Fetch 4-star or higher item (character or weapon)
            itemData = await getRandomCharacter(4) || await getRandomWeapon(4);
            setFourStarPity(0); // Reset 4-star pity after guaranteed 4-star pull
        }
        // Handle pity system for 5-star (80 pulls without 5-star)
        else if (fiveStarPity == 79 || (fiveStarPity == 79 && fourStarPity == 9)) {
            // Fetch 5-star item (character or weapon)
            itemData = await getRandomCharacter(5) || await getRandomWeapon(5);
            setFiveStarPity(0); // Reset 5-star pity after guaranteed 5-star pull
        }
        // Regular pulls based on probability
        else {
            // Handle regular pulls with probabilities
            const pullOutcome = Math.random() * 100; // Generate a random number between 0 and 100

            if (pullOutcome < 93.3) {
                console.log("3-star: " + pullOutcome);
                // 93.3% chance for 3-star or lower items (1-star, 2-star, 3-star)
                itemData = await getRandomWeapon(3); // Fetch 3-star or lower weapon
            }
            else if (pullOutcome < 99.3) {
                console.log("4-star: " + pullOutcome);
                // 6% chance for 4-star (could be character or weapon)
                itemData = await getRandomCharacter(4) || await getRandomWeapon(4); // Fetch 4-star character or weapon
            }
            else {
                console.log("5-star: " + pullOutcome);
                // 0.7% chance for 5-star (could be character or weapon)
                itemData = await getRandomCharacter(5) || await getRandomWeapon(5); // Fetch 5-star character or weapon
            }
        }

        if (itemData) {
            setPreviousPull(pullResult); // Set the current pull as the previous one
            setPullResult(itemData);
            setPullHistory((prevHistory) => {
                const newHistory = [...prevHistory, itemData];
                return newHistory.slice(-10); // Keep only the last 10 pulls
            });

            // Update the combined rarity counters
            const rarity = parseInt(itemData.rarity);
            setRarityCounters((prevCounters) => {
                if (rarity === 1 || rarity === 2 || rarity === 3) {
                    return { ...prevCounters, threeStar: prevCounters.threeStar + 1 }; // Increment 3-star counter for 1, 2, and 3-star weapons
                } else if (rarity === 4) {
                    return { ...prevCounters, fourStar: prevCounters.fourStar + 1 };
                } else if (rarity === 5) {
                    return { ...prevCounters, fiveStar: prevCounters.fiveStar + 1 };
                }
                return prevCounters;
            });

            // Reset pity counters on 4-star and 5-star pulls
            if (rarity === 4) {
                setFourStarPity(0);
            } else if (rarity === 5) {
                setFiveStarPity(0);
            }
        }

        setIsPulling(false); // Enable the button after the pull is done
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
                {/* Pull Tracker */}
                <div className="absolute top-10 right-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-xs w-full">
                    <div className="text-xl mb-4 text-white">
                        Primogems: {primogems}
                    </div>
                    <h2 className="text-xl font-bold">Pull Tracker</h2>
                    <div className="text-xl mb-4 text-white">
                        Number of pulls: {wishCount}
                    </div>

                    <p>3-Star (including 1- and 2-star weapons): {rarityCounters.threeStar}</p>
                    <p>4-Star: {rarityCounters.fourStar}</p>
                    <p>5-Star: {rarityCounters.fiveStar}</p>
                    <p>4-Star Pity: {fourStarPity}/10</p>
                    <p>5-Star Pity: {fiveStarPity}/80</p>
                </div>

                <div className="text-center p-8 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 mb-auto">
                    <h1 className="text-4xl font-bold mb-8 text-white">Genshin Impact Wish Simulator</h1>
                    <h2 className="text-4xl font-bold mb-8 text-white">Standard</h2>

                    {/* Pull button moved to the right side */}
                    <div className="absolute right-10 bottom-24">
                        <button onClick={pullWish} className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform" disabled={primogems < pullCost || isPulling}>
                            {isPulling ? (
                                <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-blue-600 rounded-full"></div>
                            ) : (
                                `Pull (Cost: ${pullCost} Primogems)`
                            )}
                        </button>
                    </div>

                    {error && <div className="mt-4 text-red-500 font-semibold">{error}</div>}
                    {pullResult && (
                        <div className="mt-6 bg-gray-700 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-center text-white">
                                You've pulled a {pullResult.rarity}-star {pullResult.type}!
                            </h3>
                            <p className="mt-2 text-center text-white">ID: {pullResult.id}</p>
                            <div className="flex justify-center space-x-6 overflow-x-auto">
                                <div className="flex-shrink-0 w-60">
                                    {/* Use a placeholder if no image is available */}
                                    <img
                                        src={pullResult.image || "https://i.kym-cdn.com/entries/icons/mobile/000/049/004/lebronsunshinecover.jpg"}
                                        alt={pullResult.id}
                                        className="w-full h-60 object-cover mx-auto mt-4"
                                    />
                                    <p className="mt-2 text-center text-white px-2 max-h-24 overflow-y-auto">{pullResult.description}</p>
                                </div>

                                {/* Previous pull */}
                                {previousPull && (
                                    <div className="flex-shrink-0 w-60">
                                        {/* Use a placeholder if no image is available */}
                                        <img
                                            src={previousPull.image || "https://i.kym-cdn.com/entries/icons/mobile/000/049/004/lebronsunshinecover.jpg"}
                                            alt={previousPull.id}
                                            className="w-full h-60 object-cover mx-auto mt-4"
                                        />
                                        <p className="mt-2 text-center text-white px-2 max-h-24 overflow-y-auto">{previousPull.description}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>

                {/* Show Pull History button on the left side */}
                <div className="absolute left-10 bottom-10 z-10">
                    <button onClick={toggleHistory} className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:scale-105 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-4 text-sm rounded-lg shadow-md mt-4 transition-all duration-300 ease-in-out transform">
                        {showHistory ? 'Hide Pull History' : 'Show Pull History'}
                    </button>
                </div>

                {/* Pull History */}
                {showHistory && pullHistory.length > 0 && (
                    <div className="absolute left-10 top-20 bg-gray-700 p-6 rounded-lg shadow-md w-80 max-h-[calc(100vh-200px)] overflow-y-auto z-10">
                        <h3 className="text-xl font-semibold text-center text-white">Pull History</h3>
                        <div className="mt-4 space-y-4">
                            {pullHistory.map((item, index) => (
                                <div key={index} className="bg-gray-600 p-4 rounded-lg shadow-md">
                                    <p className="font-semibold text-white">{item.rarity}-star {item.type}</p>
                                    <p className="text-white">{item.id}</p>
                                    <img src={`https://genshin.jmp.blue/weapons/${item.id}/icon`} alt={item.id} className="w-24 mx-auto mt-2" />
                                    <p className="mt-2 text-white">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
