import React from 'react';

interface BannerSwitchProps {
    isWeaponBanner: boolean;
    toggleBanner: (isWeapon: boolean) => void;
}

const BannerSwitch: React.FC<BannerSwitchProps> = ({ isWeaponBanner, toggleBanner }) => {
    return (
        <div className="cursor-paddle">
        <div className="fixed right-56 bottom-32">
            <nav className="bg-gray-700 bg-opacity-70 p-1 rounded-lg shadow-lg mb-1">
                <ul className="flex space-x-2">
                    <li>
                        <button
                            onClick={() => toggleBanner(false)}
                            className="cursor-pow bg-red-500 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-indigo-600 hover:scale-75"
                        >
                            Standard Banner
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => toggleBanner(true)}
                            className="cursor-pow bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-orange-700 hover:scale-75"
                        >
                            Weapon Banner
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
        </div>
    );
};

export default BannerSwitch;
