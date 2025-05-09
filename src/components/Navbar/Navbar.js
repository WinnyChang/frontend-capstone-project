import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../images/logo.png';
import ProfileCard from '../ProfileCard/ProfileCard';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [navOpen, setNavOpen] = useState(false);
    const handleHamburgerClick = () => setNavOpen(prev => !prev);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const handleUserClick = () => setDropDownOpen(prev => !prev);
    const dropDownRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

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

    // Close dropdown on route change
    useEffect(() => {
        setDropDownOpen(false);
    }, [location]);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(event.target)
            ) {
                setDropDownOpen(false);
            }
        }
        if (dropDownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropDownOpen]);

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
                    <li className={styles.user} style={{ position : 'relative'}} ref={dropDownRef}>
                        <button onClick={handleUserClick}>
                            {`Welcome, ${username}`}
                        </button>
                        <ProfileCard dropDownOpen={dropDownOpen} closeDropDown={() => setDropDownOpen(false)}/>
                    </li>
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