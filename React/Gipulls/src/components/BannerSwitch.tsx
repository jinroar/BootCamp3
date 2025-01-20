import React from 'react';

interface BannerSwitchProps {
    isWeaponBanner: boolean;
    toggleBanner: (isWeapon: boolean) => void;
}

const BannerSwitch: React.FC<BannerSwitchProps> = ({ isWeaponBanner, toggleBanner }) => {
    return (
        <div className="absolute right-10 bottom-24">
            <nav className="bg-gray-700 bg-opacity-70 p-1 rounded-lg shadow-lg mb-2">
                <ul className="flex space-x-4">
                    <li>
                        <button
                            onClick={() => toggleBanner(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-indigo-600 hover:scale-105"
                        >
                            Standard Banner
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => toggleBanner(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-amber-600 hover:scale-105"
                        >
                            Weapon Banner
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default BannerSwitch;
