import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProfileCard.module.css';

function ProfileCard({ dropDownOpen, closeDropDown }) {
  return (
    <div>
        <div>
            <ul className={`${styles.nav_links} ${dropDownOpen ? styles.open : ''}`}>
                <li className={styles.nav_link}>
                    <Link to='/profile' onClick={closeDropDown}>Your Profile</Link>
                </li>
                <li className={styles.nav_link}>
                    <Link to='/reports' onClick={closeDropDown}>Your Reports</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default ProfileCard;