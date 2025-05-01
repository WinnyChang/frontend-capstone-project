import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <div>
        <BrowserRouter> {/* Set up BrowserRouter for routing */}
            <Navbar/>
            <Routes> {/* Set up the Routes for different pages */}
                <Route path='/' element={<LandingPage/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;