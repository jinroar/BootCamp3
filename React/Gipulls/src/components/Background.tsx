// Background.tsx
import React from 'react';

const Background: React.FC = () => {
    return (
        <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: 'url("https://pa1.narvii.com/7742/e2079410e35198a15a6547222b38feefa188c800r1-960-539_hq.gif")',
            }}
        ></div>
    );
};

export default Background;
