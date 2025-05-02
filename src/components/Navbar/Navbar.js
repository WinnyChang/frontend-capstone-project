import React, { useState } from 'react';
import './Navbar.css';
import logo from "../../images/logo.png";

function Navbar() {
    const [navOpen, setNavOpen] = useState(false);

    const handleHamburgerClick = () => {
        setNavOpen(prev => !prev);
    };

    return (
        <nav>
            {/* Logo */}            
            <a href="/">
                <img src={logo} alt="Stay Healthy logo" />
            </a>

            {/* Menu icon (display on smaller screens) */}
            <button 
                className="hamburger" 
                aria-label="Toggle navigation"
                onClick={handleHamburgerClick}
            >
                {navOpen ? '×' : '☰'}
            </button>
            
            {/* Navigation links */}
            <ul className={`nav_links ${navOpen ? 'open' : ''}`}>
                <li className="nav_link">
                    <a href="../LandingPage/LandingPage.html">Home</a>
                </li>
                <li className="nav_link">
                    <a href="#">Appointments</a>
                </li>
                <li className="nav_link">
                    <a href="../LandingPage/LandingPage.html">Health Blog</a>
                </li>
                <li className="nav_link">
                    <a href="#">Reviews</a>
                </li>
                <li className="btn">
                    <a href="../LogIn/LogIn.html">Log in</a>
                </li>
                <li className="btn">
                    <a href="../SignUp/SignUp.html">Sign up</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;