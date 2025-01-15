// // types.ts
// export type PullResult = {
//     rarity: string;
//     type: string;
//     id: string;
//     image: string;
//     description: string;
// };

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