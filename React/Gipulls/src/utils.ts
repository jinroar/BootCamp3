 

// utils.ts

import { CharacterData, PullResult, WeaponData } from "./types";

// In-memory caches
let cachedWeapons: PullResult[] | null = null;
let cachedCharacters: PullResult[] | null = null;

// Fetch weapon details from API
export const getWeaponDetails = async (name: string): Promise<PullResult | null> => {
    try {
        const response = await fetch(`https://genshin.jmp.blue/weapons/${name}`);
        if (!response.ok) throw new Error("Failed to fetch weapon details");
        const weaponData: WeaponData = await response.json();

        const weaponRarity = weaponData.rarity; // Access the weapon's rarity field
        const weaponImage = `https://genshin.jmp.blue/weapons/${name}/icon`;

        return {
            rarity: weaponRarity,
            type: "weapon",
            id: name,
            image: weaponImage,
            description: weaponData.passiveDesc || "No description available.",
        };
    } catch (err) {
        console.error("Error fetching weapon details:", err);
        return null;
    }
};


// Fetching character data
export const getCharacterDetails = async (name: string): Promise<PullResult | null> => {
    try {
        const response = await fetch(`https://genshin.jmp.blue/characters/${name}`);
        if (!response.ok) throw new Error("Failed to fetch character details");
        const characterData: CharacterData = await response.json();
        const characterImage = `https://genshin.jmp.blue/characters/${name.toLocaleLowerCase()}/card`;
        return {
            rarity: characterData.rarity,
            type: "character",
            id: name,
            image: characterImage,
            description: characterData.description || "No description available.",
        };
    } catch (err) {
        console.log("Error fetching character details:", err);
        return null;
    }
};


// Fetch and return all weapons data (caching mechanism)
export const getAllWeapons = async (): Promise<PullResult[] | null> => {
    if (cachedWeapons) {
        return cachedWeapons; // Return cached weapons if already fetched
    }

    try {
        const response = await fetch("https://genshin.jmp.blue/weapons/all");
        if (!response.ok) throw new Error("Failed to fetch weapons");
        const weapons: PullResult[] = await response.json();

        cachedWeapons = weapons; // Store in-memory cache
        return weapons;
    } catch (err) {
        console.error("Error fetching weapons:", err);
        return null;
    }
};

// Fetch and return all characters data (caching mechanism)
export const getAllCharacters = async (): Promise<PullResult[] | null> => {
    if (cachedCharacters) {
        return cachedCharacters; // Return cached characters if already fetched
    }

    try {
        const response = await fetch("https://genshin.jmp.blue/characters/all");
        if (!response.ok) throw new Error("Failed to fetch characters");
        const characters: PullResult[] = await response.json();

        cachedCharacters = characters; // Store in-memory cache
        return characters;
    } catch (err) {
        console.error("Error fetching characters:", err);
        return null;
    }
};


// Fetch random weapon based on rarity (using the cached data)
export const getRandomWeapon = async (maxRarity: number): Promise<PullResult | null> => {
    if (!cachedWeapons) {
        await getAllWeapons(); // Ensure the weapons are loaded (no arguments)
    }

    try {
        let selectedWeapon = null;

        // Pick a random weapon and check its rarity
        while (!selectedWeapon) {
            const randomWeapon = cachedWeapons![Math.floor(Math.random() * cachedWeapons!.length)];
            const weaponRarity = parseInt(randomWeapon.rarity);
            
            // Only select the weapon if its rarity is <= maxRarity
            if (weaponRarity <= maxRarity) {
                // Fetch full details for the selected weapon
                selectedWeapon = await getWeaponDetails(randomWeapon.id);
            }
        }

        return selectedWeapon;
    } catch (err) {
        console.error("Error fetching random weapon:", err);
        return null;
    }
};


// Fetch random character (using the cached data) based on rarity
export const getRandomCharacter = async (maxRarity: number): Promise<PullResult | null> => {
    if (!cachedCharacters) {
        await getAllCharacters(); // Ensure the characters are loaded (no arguments)
    }

    try {
        // Filter characters by maxRarity
        const validCharacters = cachedCharacters!.filter((character) => parseInt(character.rarity) <= maxRarity);
        
        if (validCharacters.length === 0) {
            console.error("No valid characters found for the specified rarity");
            return null;
        }

        // Select a random character from the filtered list
        const randomCharacter = validCharacters[Math.floor(Math.random() * validCharacters.length)];

        // Fetch full details for the selected character
        const characterDetails = await getCharacterDetails(randomCharacter.id);
        return characterDetails;
    } catch (err) {
        console.log("Error fetching random character:", err);
        return null;
    }
};




// utils.ts

// Get a random item (character or weapon) from pre-fetched data
export const getRandomItem = (
    maxRarity: number,
    allCharacters: PullResult[],
    allWeapons: PullResult[]
): PullResult | null => {
    const isCharacter = Math.random() < 0.5; // 50% chance to fetch a character or weapon

    if (isCharacter) {
        // Randomly select a character from all characters
        const character = allCharacters[Math.floor(Math.random() * allCharacters.length)];
        if (parseInt(character.rarity) <= maxRarity) {
            return character;
        }
    } else {
        // Randomly select a weapon from all weapons
        const weapon = allWeapons[Math.floor(Math.random() * allWeapons.length)];
        if (parseInt(weapon.rarity) <= maxRarity) {
            return weapon;
        }
    }

    return null;
};

// Similar changes can be made to `getRandomWeapon` or `getRandomCharacter` if needed.
