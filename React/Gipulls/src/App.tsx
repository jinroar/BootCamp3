// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StandardBanner } from './pages/StandardBanner';
import {WeaponBanner} from './pages/WeaponBanner';

const App: React.FC = () => {
  return (
    
       
    <Router>
       
        <Routes>
          <Route path="/standard-banner" element={<StandardBanner />} />
          <Route path="/weapon-banner" element={<WeaponBanner />} />
        </Routes>
   
    </Router>
  );
}

export default App;
