import React, { useState, useEffect } from 'react';
import { PullResult } from '../types';
import { getAllCharacters, getAllWeapons, getRandomWeapon, getRandomCharacter } from '../utils';
import History from '../components/History';
import PullTracker from '../components/PullTracker';
import PullResultDisplay from '../components/PullResults';
import PullButton from '../components/PullButton';
import BannerSwitch from '../components/BannerSwitch';
import ErrorMessage from '../components/ErrorMessage';
import Background from '../components/Background';

interface RarityCounters {
    threeStar: number;
    fourStar: number;
    fiveStar: number;
}

export const StandardBanner: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [wishCount, setWishCount] = useState<number>(0);
    const [pullHistory, setPullHistory] = useState<PullResult[]>([]);
    const [primogems, setPrimogems] = useState<number>(32000);
    const [isPulling, setIsPulling] = useState<boolean>(false);
    const [showHistory, setShowHistory] = useState<boolean>(false);
    const [isWeaponBanner, setIsWeaponBanner] = useState<boolean>(false);
    const [standardFourStarPity, setStandardFourStarPity] = useState<number>(0);
    const [standardFiveStarPity, setStandardFiveStarPity] = useState<number>(0);
    const [weaponFourStarPity, setWeaponFourStarPity] = useState<number>(0);
    const [weaponFiveStarPity, setWeaponFiveStarPity] = useState<number>(0);
    const [rarityCounters, setRarityCounters] = useState<RarityCounters>({
        threeStar: 0,
        fourStar: 0,
        fiveStar: 0,
    });
    const [standardPullResult, setStandardPullResult] = useState<PullResult | null>(null);
    const [weaponPullResult, setWeaponPullResult] = useState<PullResult | null>(null);
    const pullCost = 160;

    useEffect(() => {
        if (primogems <= 0) {
            setPrimogems(32000);
        }
    }, [primogems]);

    useEffect(() => {
        const storedPrimogems = localStorage.getItem('primogems');
        if (storedPrimogems) {
            setPrimogems(Number(storedPrimogems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('primogems', primogems.toString());
    }, [primogems]);

    const [allCharacters, setAllCharacters] = useState<PullResult[]>([]);
    const [allWeapons, setAllWeapons] = useState<PullResult[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const characters = await getAllCharacters();
                const weapons = await getAllWeapons();
                if (characters) setAllCharacters(characters);
                if (weapons) setAllWeapons(weapons);
            } catch (err) {
                console.error("Error fetching initial data:", err);
            }
        };
        fetchData();
    }, []);

    const pullWish = async (): Promise<void> => {
        if (primogems < pullCost || isPulling) {
            setError("Not enough Primogems or already pulling!");
            return;
        }
        setIsPulling(true);
        setError(null);
        setPrimogems((prev) => prev - pullCost);
        setWishCount((prevCount) => prevCount + 1);

        let itemData: PullResult | null = null;

        if (isWeaponBanner) {
            itemData = await handleWeaponBannerPull();
            setWeaponPullResult(itemData);
        } else {
            itemData = await handleStandardBannerPull();
            setStandardPullResult(itemData);
        }

        if (itemData) {
            updatePullHistory(itemData);
            updateRarityCounters(itemData);
        }

        setIsPulling(false);
    };

    const handleWeaponBannerPull = async () => {
        setWeaponFiveStarPity((prev) => prev + 1);
        setWeaponFourStarPity((prev) => prev + 1);
        let itemData: PullResult | null = null;

        if (weaponFiveStarPity >= 78) {
            itemData = await getRandomWeapon(5);
            setWeaponFiveStarPity(0);
        } else if (weaponFourStarPity >= 9) {
            itemData = await getRandomWeapon(4);
            setWeaponFourStarPity(0);
        } else {
            itemData = await randomWeaponPull();
        }
        return itemData;
    };

    const handleStandardBannerPull = async () => {
        setStandardFiveStarPity((prev) => prev + 1);
        setStandardFourStarPity((prev) => prev + 1);
        let itemData: PullResult | null = null;

        if (standardFiveStarPity >= 78) {
            itemData = await getRandomCharacter(5) || await getRandomWeapon(5);
            setStandardFiveStarPity(0);
        } else if (standardFourStarPity >= 9) {
            itemData = await getRandomCharacter(4) || await getRandomWeapon(4);
            setStandardFourStarPity(0);
        } else {
            itemData = await randomStandardPull();
        }
        return itemData;
    };

    const randomWeaponPull = () => {
        const pullOutcome = Math.random() * 100;
        if (pullOutcome <= 0.07) return getRandomWeapon(5);
        else if (pullOutcome <= 6.0) return getRandomWeapon(4);
        return getRandomWeapon(3);
    };

    const randomStandardPull = () => {
        const pullOutcome = Math.random() * 100;
        if (pullOutcome <= 0.06) return getRandomCharacter(5) || getRandomWeapon(5);
        else if (pullOutcome <= 5.17) return getRandomCharacter(4) || getRandomWeapon(4);
        return getRandomWeapon(3);
    };

    const updatePullHistory = (itemData: PullResult) => {
        setPullHistory((prevHistory) => {
            const newHistory = [itemData, ...prevHistory];
            return newHistory.slice(-250);
        });
    };

    const updateRarityCounters = (itemData: PullResult) => {
        const rarity = parseInt(itemData.rarity);
        setRarityCounters((prevCounters) => {
            if (rarity === 3) return { ...prevCounters, threeStar: prevCounters.threeStar + 1 };
            if (rarity === 4) return { ...prevCounters, fourStar: prevCounters.fourStar + 1 };
            if (rarity === 5) return { ...prevCounters, fiveStar: prevCounters.fiveStar + 1 };
            return prevCounters;
        });
    };

    const toggleHistory = () => {
        setShowHistory((prevState) => !prevState);
    };

    const toggleBanner = (isWeapon: boolean) => {
        setIsWeaponBanner(isWeapon);
    };

    const getBorderColor = (rarity: number): string => {
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

    return (

        <div className="relative w-full h-screen bg-black bg-opacity-80">
            <div className="cursor-paddle">
                {/* Background Component with absolute positioning */}
                <Background />
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                    {/* Main Banner Content */}
                    <div className="w-full max-w-3xl p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg space-y-6">
                        {/* Header */}
                        <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Genshin Impact Wish Simulator</h1>

                        {/* BannerSwitch Component */}
                        <div className="fixed top-5 sm:bottom-16 -right-56 transform -translate-x-1/2 z-20">
                            <BannerSwitch isWeaponBanner={isWeaponBanner} toggleBanner={toggleBanner} />
                        </div>
                        {/* Error Message */}
                        <ErrorMessage error={error} />

                        {/* Pull Button */}
                        <PullButton
                            isPulling={isPulling}
                            pullCost={pullCost}
                            primogems={primogems}
                            onClick={pullWish}
                        />

                        {/* Pull Result Display */}
                        {(isWeaponBanner ? weaponPullResult : standardPullResult) && (
                            <PullResultDisplay pullResult={isWeaponBanner ? weaponPullResult : standardPullResult} getBorderColor={getBorderColor} />
                        )}

                        {/* Pull Tracker */}
                        <PullTracker
                            primogems={primogems}
                            wishCount={wishCount}
                            rarityCounters={rarityCounters}
                            fourStarPity={isWeaponBanner ? weaponFourStarPity : standardFourStarPity}
                            fiveStarPity={isWeaponBanner ? weaponFiveStarPity : standardFiveStarPity}
                        />
                    </div>

                    {/* History */}
                    <History pullHistory={pullHistory} showHistory={showHistory} toggleHistory={toggleHistory} getBorderColor={getBorderColor} />
                </div>
            </div>
        </div>

    );
};

export default StandardBanner;
