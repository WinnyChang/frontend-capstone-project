import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../images/logo.png';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [navOpen, setNavOpen] = useState(false);
    const handleHamburgerClick = () => setNavOpen(prev => !prev);
    const navigate = useNavigate();

    const handleLogOut = () => {
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('phone');
        sessionStorage.removeItem('email');
        localStorage.removeItem('doctorData');

        setIsLoggedIn(false);
        setEmail('');
        setUsername('');

        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('reviewFormData_')) {
                localStorage.removeItem(key);
            }
        }
        navigate('/');
        window.location.reload();
    };

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('email');
        if (storedEmail) {
            setIsLoggedIn(true);
            setEmail(storedEmail);
            setUsername(storedEmail.split('@')[0]);  // Extract username
        }
    }, []);

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
                    <Link to='/instant-consultation'>Consultation</Link>
                </li>
                <li className={styles.nav_link}>
                    <Link to='/appointments'>Appointments</Link>
                </li>
                <li className={styles.nav_link}>
                    <Link to='#'>Health Blog</Link>
                </li>
                <li className={styles.nav_link}>
                    <Link to='/reviews'>Reviews</Link>
                </li>

            {/* Display different content based on log-in state */}
            { isLoggedIn ? (
                <>
                    <p className={styles.user}>{`Welcome, ${username}`}</p>
                    <li className={styles.btn}>
                        <button onClick={handleLogOut}>Log out</button>
                    </li>
                </>
            ) : (
                <>
                    <li className={styles.btn}>
                        <Link to='/log-in'>Log in</Link>
                    </li>
                    <li className={styles.btn}>
                        <Link to='/sign-up'>Sign up</Link>
                    </li>
                </>
            )}
            </ul>
        </nav>
    );
};

export default Navbar;