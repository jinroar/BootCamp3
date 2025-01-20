// hooks/usePullLogic.ts
import { useState } from 'react';
import { PullResult } from '../types';
import { getRandomCharacter, getRandomWeapon } from '../utils';

interface PullLogicReturn {
  wishCount: number;
  pullHistory: PullResult[];
  pullWish: (isWeaponBanner: boolean) => Promise<void>;
  standardFourStarPity: number;
  standardFiveStarPity: number;
  weaponFourStarPity: number;
  weaponFiveStarPity: number;
}

export const usePullLogic = (
  primogems: number,
  setPrimogems: React.Dispatch<React.SetStateAction<number>>,
  pullCost: number
): PullLogicReturn => {
  const [isPulling, setIsPulling] = useState<boolean>(false);
  const [wishCount, setWishCount] = useState<number>(0);
  const [pullHistory, setPullHistory] = useState<PullResult[]>([]);

  const [standardFourStarPity, setStandardFourStarPity] = useState<number>(0);
  const [standardFiveStarPity, setStandardFiveStarPity] = useState<number>(0);
  const [weaponFourStarPity, setWeaponFourStarPity] = useState<number>(0);
  const [weaponFiveStarPity, setWeaponFiveStarPity] = useState<number>(0);

  const pullWish = async (isWeaponBanner: boolean): Promise<void> => {
    if (primogems < pullCost || isPulling) {
      return; // Don't do anything if not enough primogems or already pulling
    }

    setIsPulling(true);
    setPrimogems((prev) => prev - pullCost);
    setWishCount((prevCount) => prevCount + 1);

    let itemData: PullResult | null = null;

    if (isWeaponBanner) {
      // Weapon Banner Logic
      setWeaponFiveStarPity((prev) => prev + 1);
      setWeaponFourStarPity((prev) => prev + 1);

      if (weaponFiveStarPity >= 78) {
        itemData = await getRandomWeapon(5);
        setWeaponFiveStarPity(0);
      } else if (weaponFourStarPity >= 9) {
        itemData = await getRandomWeapon(4);
        setWeaponFourStarPity(0);
      } else {
        const pullOutcome = Math.random() * 100;
        if (pullOutcome <= 0.07) {
          itemData = await getRandomWeapon(5);
          setWeaponFiveStarPity(0);
        } else if (pullOutcome <= 6.0) {
          itemData = await getRandomWeapon(4);
          setWeaponFourStarPity(0);
        } else {
          itemData = await getRandomWeapon(3);
        }
      }
    } else {
      // Standard Banner Logic
      setStandardFiveStarPity((prev) => prev + 1);
      setStandardFourStarPity((prev) => prev + 1);

      if (standardFiveStarPity >= 78) {
        itemData = await getRandomCharacter(5) || await getRandomWeapon(5);
        setStandardFiveStarPity(0);
      } else if (standardFourStarPity >= 9) {
        itemData = await getRandomCharacter(4) || await getRandomWeapon(4);
        setStandardFourStarPity(0);
      } else {
        const pullOutcome = Math.random() * 100;
        if (pullOutcome <= 0.06) {
          itemData = await getRandomCharacter(5) || await getRandomWeapon(5);
          setStandardFiveStarPity(0);
        } else if (pullOutcome <= 5.17) {
          itemData = await getRandomCharacter(4) || await getRandomWeapon(4);
          setStandardFourStarPity(0);
        } else {
          itemData = await getRandomWeapon(3);
        }
      }
    }

    if (itemData) {
      setPullHistory((prevHistory) => {
        const newHistory = [itemData, ...prevHistory];
        return newHistory.slice(-250);
      });
    }

    setIsPulling(false);
  };

  return {
    wishCount,
    pullHistory,
    pullWish,
    standardFourStarPity,
    standardFiveStarPity,
    weaponFourStarPity,
    weaponFiveStarPity,
  };
};
