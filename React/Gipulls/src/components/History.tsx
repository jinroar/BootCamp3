// PrimogemDisplay.tsx
import React from 'react';

type Props = {
    primogems: number;
};




const History: React.FC<Props> = ({ primogems }) => (
    <div className="absolute top-10 left-10">
    <button 
        onClick={toggleHistory} 
        className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out transform"
    >
        History
    </button>
</div>

);

export default History;

