// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { StandardBanner } from './pages/StandardBanner';
import { WeaponBanner } from './pages/WeaponBanner';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        {/* Navigation Menu */}
        <nav className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/standard-banner"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
              >
                Standard Banner
              </Link>
            </li>
            <li>
              <Link
                to="/weapon-banner"
                className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-slate-600"
              >
                Weapon Banner
              </Link>
            </li>
          </ul>
        </nav>

        {/* Routes for Banners */}
        <Routes>
          <Route path="/standard-banner" element={<StandardBanner />} />
          <Route path="/weapon-banner" element={<WeaponBanner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
