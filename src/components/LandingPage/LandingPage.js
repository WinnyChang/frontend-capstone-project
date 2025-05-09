import React from 'react';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.line1}>Your Health</h1>
        <h1 className={styles.line2}>Our Responsibility</h1>
        <p>Access doctors anytime, anywhere.</p>
        <button className={styles.btn}>Get Started</button>
      </div>
    </div>
  );
};

export default LandingPage;