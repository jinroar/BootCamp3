import React, { useState } from 'react';

// Type definitions for the pulled result
type PullResult = {
    rarity: string;
    type: string;
    id: string;
    image: string;
    description: string;
};

// Define expected structure for character data
type CharacterData = {
    rarity: string;
    description?: string;
};

// Define expected structure for weapon data
type WeaponData = {
    rarity: string;
    passiveDesc?: string;
};

export const StandardBanner: React.FC = () => {
    const [pullResult, setPullResult] = useState<PullResult | null>(null);
    const [error, setError] = useState<string | null>(null); // Track errors
    const [wishCount, setWishCount] = useState<number>(0); // Track the number of pulls
    const [pulled4Star, setPulled4Star] = useState<boolean>(false); // Track if we've pulled a 4-star yet
    const [pulled5Star, setPulled5Star] = useState<boolean>(false); // Track if we've pulled a 5-star yet
    const [pullHistory, setPullHistory] = useState<PullResult[]>([]); // Store history of pulls
    const [showHistory, setShowHistory] = useState<boolean>(false); // Toggle history visibility

    const [primogems, setPrimogems] = useState<number>(32000); // User's primogem balance
    const pullCost = 160; // Cost of each pull in primogems

    // Fetch character data based on name
    const getCharacterDetails = async (name: string): Promise<PullResult | null> => {
        try {
            const response = await fetch(`https://genshin.jmp.blue/characters/${name}`);
            if (!response.ok) {
                throw new Error("Failed to fetch character details");
            }
            const characterData: CharacterData = await response.json();

            // Construct character image URL (fall back to default image if not available)
            const characterImage = `https://genshin.jmp.blue/characters/${name}/card`;

            return {
                rarity: characterData.rarity,
                type: "character",
                id: name,
                image: characterImage,  // Use the character image URL
                description: characterData.description || "No description available.",
            };
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(`Error: ${err.message}`);
            } else {
                setError("An unknown error occurred.");
            }
            return null;
        }
    };

    // Fetch weapon data based on name
    const getWeaponDetails = async (name: string): Promise<PullResult | null> => {
        try {
            const response = await fetch(`https://genshin.jmp.blue/weapons/${name}`);
            if (!response.ok) {
                throw new Error("Failed to fetch weapon details");
            }
            const weaponData: WeaponData = await response.json();
            // Weapons have image property in API response
            const weaponImage = `https://genshin.jmp.blue/weapons/${name}/icon`;

            return {
                rarity: weaponData.rarity,
                type: "weapon",
                id: name,
                image: weaponImage, // Use the weapon image from the response
                description: weaponData.passiveDesc || "No description available.",
            };
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(`Error: ${err.message}`);
            } else {
                setError("An unknown error occurred.");
            }
            return null;
        }
    };

    // Fetch all characters and select a random character
    const getRandomCharacter = async (): Promise<PullResult | null> => {
        try {
            const response = await fetch("https://genshin.jmp.blue/characters");
            if (!response.ok) {
                throw new Error("Failed to fetch characters");
            }
            const characters: string[] = await response.json();
            const randomCharacterName = characters[Math.floor(Math.random() * characters.length)];

            return await getCharacterDetails(randomCharacterName);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(`Error: ${err.message}`);
            } else {
                setError("An unknown error occurred.");
            }
            return null;
        }
    };

    // Fetch all weapons and select a random weapon
    const getRandomWeapon = async (): Promise<PullResult | null> => {
        try {
            const response = await fetch("https://genshin.jmp.blue/weapons");
            if (!response.ok) {
                throw new Error("Failed to fetch weapons");
            }
            const weapons: string[] = await response.json();
            const randomWeaponName = weapons[Math.floor(Math.random() * weapons.length)];

            return await getWeaponDetails(randomWeaponName);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(`Error: ${err.message}`);
            } else {
                setError("An unknown error occurred.");
            }
            return null;
        }
    };

    // Simulate a "Wish" pull
    const pullWish = async (): Promise<void> => {
        if (primogems < pullCost) {
            setError("Not enough Primogems to pull.");
            return;
        }

        setError(null); // Clear any previous errors

        // Deduct the primogems cost
        setPrimogems((prev) => prev - pullCost);

        // Increment the wish count
        setWishCount((prevCount) => prevCount + 1);

        let itemData: PullResult | null = null;

        // Handle guaranteed 4-star and 5-star pulls based on the pity system
        if (wishCount >= 80 && !pulled5Star) {
            // Guaranteed 5-star after 80 pulls
            const isCharacter = Math.random() < 0.5; // 50% chance for character or weapon
            itemData = isCharacter ? await getRandomCharacter() : await getRandomWeapon();
            setPulled5Star(true); // Mark that we've pulled a 5-star
            setWishCount(0); // Reset the pity counter for 5-star
        } else if (wishCount >= 10 && !pulled4Star) {
            // Guaranteed 4-star after 10 pulls
            const isCharacter = Math.random() < 0.5; // 50% chance for character or weapon
            itemData = isCharacter ? await getRandomCharacter() : await getRandomWeapon();
            setPulled4Star(true); // Mark that we've pulled a 4-star
            setWishCount(0); // Reset the pity counter for 4-star
        } else {
            // Normal random pull logic based on given chances:
            const pullOutcome = Math.random();
            if (pullOutcome < 0.006) {
                // 0.6% chance for a 5-star
                const isCharacter = Math.random() < 0.5; // 50% chance for character or weapon
                itemData = isCharacter ? await getRandomCharacter() : await getRandomWeapon();
                setPulled5Star(true); // Mark that we've pulled a 5-star
            } else if (pullOutcome < 0.056) {
                // 5.1% chance for a 4-star
                const isCharacter = Math.random() < 0.5; // 50% chance for character or weapon
                itemData = isCharacter ? await getRandomCharacter() : await getRandomWeapon();
                setPulled4Star(true); // Mark that we've pulled a 4-star
            } else {
                // 94.3% chance for a 3-star weapon
                itemData = await getRandomWeapon();
            }
        }

        // Display the pulled item with the correct rarity fetched from API
        setPullResult(itemData);

        // Add the new pull to the history
        if (itemData) {
            setPullHistory((prevHistory) => [...prevHistory, itemData]);
        }
    };

    // Toggle the visibility of pull history
    const toggleHistory = () => {
        setShowHistory((prevState) => !prevState);
    };

    return (
        <div className="min-h-screen flex justify-center items-center"
            style={{
                backgroundImage: 'url("https://pa1.narvii.com/7742/e2079410e35198a15a6547222b38feefa188c800r1-960-539_hq.gif")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="text-center p-8 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-8 text-white">Genshin Impact Wish Simulator</h1>
                <h2 className="text-4xl font-bold mb-8 text-white">Weapon</h2>
                {/* Show current primogem balance */}
                <div className="text-xl mb-4 text-white">Primogems: {primogems}</div>

                <button
                    onClick={pullWish}
                    className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform"
                    disabled={primogems < pullCost} // Disable the button if not enough primogems
                >
                    Pull (Cost: {pullCost} Primogems)
                </button>

                {error && (
                    <div className="mt-4 text-red-500 font-semibold">{error}</div>
                )}

                {/* Display current and previous pull side by side */}
                {pullResult && (
                    <div className="mt-6 bg-gray-700 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-center text-white">
                            You've pulled a {pullResult.rarity} {pullResult.type}!
                        </h3>
                        <p className="mt-2 text-center text-white">ID: {pullResult.id}</p>

                        <div className="flex justify-center space-x-6 overflow-x-auto">
                            {/* Current pull */}
                            <div className="flex-shrink-0 w-60">
                                <img
                                    src={pullResult.image}
                                    alt={pullResult.id}
                                    className="w-full h-60 object-cover mx-auto mt-4"
                                />
                                <p className="mt-2 text-center text-white px-2 max-h-24 overflow-auto">{pullResult.description}</p>
                            </div>

                            {/* Previous pull (if exists) */}
                            {pullHistory.length > 1 && (
                                <div className="flex-shrink-0 w-60">
                                    <img
                                        src={pullHistory[pullHistory.length - 2].image}
                                        alt={pullHistory[pullHistory.length - 2].id}
                                        className="w-full h-60 object-cover mx-auto mt-4"
                                    />
                                    <p className="mt-2 text-center text-white px-2 max-h-24 overflow-auto">
                                        {pullHistory[pullHistory.length - 2].description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* History button below pulled item */}
                <div className="mt-6">
                    <button
                        onClick={toggleHistory}
                        className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:scale-105 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-4 text-sm rounded-lg shadow-md mt-4 transition-all duration-300 ease-in-out transform"
                    >
                        {showHistory ? 'Hide Pull History' : 'Show Pull History'}
                    </button>
                </div>

                {/* Show pull history if available */}
                {showHistory && pullHistory.length > 0 && (
                    <div className="mt-6 bg-gray-700 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-center text-white">Pull History</h3>
                        <div className="mt-4 space-y-4">
                            {pullHistory.map((item, index) => (
                                <div key={index} className="bg-gray-600 p-4 rounded-lg shadow-md">
                                    <p className="font-semibold text-white">{item.rarity} {item.type}</p>
                                    <p className="text-white">{item.id}</p>
                                    <img
                                        src={item.image}
                                        alt={item.id}
                                        className="w-24 mx-auto mt-2"
                                    />
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
