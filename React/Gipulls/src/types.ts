// // types.ts
// export type PullResult = {
//     rarity: string;
//     type: string;
//     id: string;
//     image: string;
//     description: string;
// };


// types.ts
export type PullDisplay = {
    name: string;
    rarity: string;
    type: string; // e.g., 'weapon', 'character'
    imageUrl: string;
};

export type RarityCounters = {
    threeStar: number;
    fourStar: number;
    fiveStar: number;
};

export interface PullResult {
    id: string;
    rarity: string;
    type: string; // 'weapon' or 'character'
    image: string;
    description: string;
}

export type WeaponData = {
    rarity: string;
    passiveDesc?: string;
};

export type CharacterData = {
    rarity: string;
    description?: string;
};