import React, { useState } from 'react';

// Define types for the API response
type CharacterData = {
    rarity: string;
    description?: string;
};

type WeaponData = {
    rarity: string;
    passiveDesc?: string;
};

type PullResult = {
    rarity: string;
    type: string;
    id: string;
    image: string;
    description: string;
};

export const WeaponBanner: React.FC = () => {
    const [pullResult, setPullResult] = useState<PullResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [wishCount, setWishCount] = useState<number>(0);
    const [pulled4Star, setPulled4Star] = useState<boolean>(false);
    const [pulled5Star, setPulled5Star] = useState<boolean>(false);
    const [pullHistory, setPullHistory] = useState<PullResult[]>([]); // Store history of pulls
    const [showHistory, setShowHistory] = useState<boolean>(false); // Toggle history visibility

    const [primogems, setPrimogems] = useState<number>(32000); // User's primogem balance
    const pullCost = 160; // Cost of each pull in primogems

    const getCharacterDetails = async (name: string): Promise<PullResult | null> => {
        try {
            const response = await fetch(`https://genshin.jmp.blue/characters/${name}`);
            if (!response.ok) {
                throw new Error("Failed to fetch character details");
            }
            const characterData: CharacterData = await response.json();
            const characterImage = `https://genshin.jmp.blue/characters/${name}/card`;

            return {
                rarity: characterData.rarity,
                type: "character",
                id: name,
                image: characterImage,
                description: characterData.description || "No description available.",
            };
        } catch (err) {
            setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
            return null;
        }
    };

    const getWeaponDetails = async (name: string): Promise<PullResult | null> => {
        try {
            const response = await fetch(`https://genshin.jmp.blue/weapons/${name}`);
            if (!response.ok) {
                throw new Error("Failed to fetch weapon details");
            }
            const weaponData: WeaponData = await response.json();
            const weaponImage = `https://genshin.jmp.blue/weapons/${name}/icon`;

            return {
                rarity: weaponData.rarity,
                type: "weapon",
                id: name,
                image: weaponImage,
                description: weaponData.passiveDesc || "No description available.",
            };
        } catch (err) {
            setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
            return null;
        }
    };

    const getRandomCharacter = async (): Promise<PullResult | null> => {
        try {
            const response = await fetch("https://genshin.jmp.blue/characters");
            if (!response.ok) {
                throw new Error("Failed to fetch characters");
            }
            const characters: string[] = await response.json();
            const randomCharacterName = characters[Math.floor(Math.random() * characters.length)];

            return await getCharacterDetails(randomCharacterName);
        } catch (err) {
            setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
            return null;
        }
    };

    const getRandomWeapon = async (): Promise<PullResult | null> => {
        try {
            const response = await fetch("https://genshin.jmp.blue/weapons");
            if (!response.ok) {
                throw new Error("Failed to fetch weapons");
            }
            const weapons: string[] = await response.json();
            const randomWeaponName = weapons[Math.floor(Math.random() * weapons.length)];

            return await getWeaponDetails(randomWeaponName);
        } catch (err) {
            setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
            return null;
        }
    };

    const pullWish = async (): Promise<void> => {
        if (primogems < pullCost) {
            setError("Not enough Primogems for a pull.");
            return;
        }

        setError(null);
        setPrimogems((prev) => prev - pullCost); // Deduct the cost of the pull

        setWishCount((prevCount) => prevCount + 1);

        let itemData: PullResult | null = null;
        let pullOutcome = Math.random();

        if (wishCount % 80 === 0 && !pulled5Star) {
            const isCharacter = Math.random() < 0.5;
            itemData = isCharacter ? await getRandomCharacter() : await getRandomWeapon();
            setPulled5Star(true);
        } else if (wishCount % 10 === 0 && !pulled4Star) {
            const isCharacter = Math.random() < 0.5;
            itemData = isCharacter ? await getRandomCharacter() : await getRandomWeapon();
            setPulled4Star(true);
        } else {
            if (pullOutcome < 0.007) {
                const isCharacter = Math.random() < 0.5;
                itemData = isCharacter ? await getRandomCharacter() : await getRandomWeapon();
                setPulled5Star(true);
            } else if (pullOutcome < 0.06) {
                const isCharacter = Math.random() < 0.5;
                itemData = isCharacter ? await getRandomCharacter() : await getRandomWeapon();
                setPulled4Star(true);
            } else {
                itemData = await getRandomWeapon();
            }
        }

        if (itemData) {
            setPullResult(itemData);
            setPullHistory((prevHistory) => [...prevHistory, itemData]); // Add the new pull to the history
        }
    };

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
                    className="bg-gradient-to-r from-yellow-500 via-indigo-600 to-indigo-700 hover:scale-105 hover:from-indigo-600 hover:to-indigo-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform"
                    disabled={primogems < pullCost} // Disable the button if not enough primogems
                >
                    Pull (Cost: {pullCost} Primogems)
                </button>

                {error && (
                    <div className="mt-4 text-red-500 font-semibold">{error}</div>
                )}

{pullResult && (
    <div className="mt-6 bg-gray-700 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-center text-white">
            You've pulled a {pullResult.rarity} {pullResult.type}!
        </h3>
        <p className="mt-2 text-center text-white">ID: {pullResult.id}</p>

        <div className="flex justify-center space-x-6 overflow-x-auto">
            {/* Current pulled item */}
            <div className="flex-shrink-0 w-60">
                <img
                    src={pullResult.image}
                    alt={pullResult.id}
                    className="w-full h-60 object-cover mx-auto mt-4"
                />
                <p className="mt-2 text-center text-white px-2 max-h-24 overflow-auto">{pullResult.description}</p>
            </div>

            {/* Previous pull item - only show if there's history and more than one item in history */}
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



                {/* History button below pulled item with spacing */}
                <div className="mt-6">
                    <button
                        onClick={toggleHistory}
                        className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:scale-105 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-4 text-sm rounded-lg shadow-md mt-4 transition-all duration-300 ease-in-out transform"
                    >
                        {showHistory ? 'Hide Pull History' : 'Show Pull History'}
                    </button>
                </div>

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
