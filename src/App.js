import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';

function App() {
  return (
    <div className='app-wrapper'>
        <BrowserRouter> {/* Set up BrowserRouter for routing */}
            <Navbar/>
            <Routes> {/* Set up the Routes for different pages */}
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='/log-in' element={<LogIn/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;