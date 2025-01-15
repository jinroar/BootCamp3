// PrimogemDisplay.tsx
import React from 'react';

type Props = {
    primogems: number;
};

const PrimogemDisplay: React.FC<Props> = ({ primogems }) => (
    <div className="absolute top-10 right-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center">
            <img src="https://example.com/primogem-icon.png" alt="Primogem Icon" className="w-8 h-8 mr-2" />
            <span className="text-xl font-bold">Primogems: {primogems}</span>
        </div>
    </div>
);

export default PrimogemDisplay;
