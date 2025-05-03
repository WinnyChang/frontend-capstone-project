import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../images/logo.png';

function Navbar() {
    const [navOpen, setNavOpen] = useState(false);

    const handleHamburgerClick = () => {
        setNavOpen(prev => !prev);
    };

    return (
        <nav>
            {/* Logo */}            
            <Link to='/'>
                <img src={logo} alt='Stay Healthy logo' />
            </Link>

            {/* Menu icon (display on smaller screens) */}
            <button 
                className={styles.hamburger} 
                aria-label='Toggle navigation'
                onClick={handleHamburgerClick}
            >
                {navOpen ? '×' : '☰'}
            </button>
            
            {/* Navigation links */}
            <ul className={`${styles.nav_links} ${navOpen ? styles.open : ''}`}>
                <li className={styles.nav_link}>
                    <Link to='/'>Home</Link>
                </li>
                <li className={styles.nav_link}>
                    <Link to='#'>Appointments</Link>
                </li>
                <li className={styles.nav_link}>
                    <Link to='#'>Health Blog</Link>
                </li>
                <li className={styles.nav_link}>
                    <Link to='#'>Reviews</Link>
                </li>
                <li className={styles.btn}>
                    <Link to='/log-in'>Log in</Link>
                </li>
                <li className={styles.btn}>
                    <Link to='/sign-up'>Sign up</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;