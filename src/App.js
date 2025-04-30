import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div>
        <BrowserRouter> {/* Set up BrowserRouter for routing */}
            <Navbar/>
            <Routes> {/* Set up the Routes for different pages */}

            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;