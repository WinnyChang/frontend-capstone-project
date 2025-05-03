import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LogIn.module.css';
import eyeOff from '../../images/eye-off.png'
import eye from '../../images/eye.png'

function LogIn() {
    const [pwShow, setPwShow] = useState(false);

    const handleEyeClick = () => {
        setPwShow(prev => !prev);
    };

    return (
        <div className={styles.container}>
            <div className={styles['form-container']}>
                <form>
                    <h1>Log In</h1>

                    <div className={styles.input}>
                        <label for='email'>Email</label>
                        <input type='email' name='email' id='email' required placeholder='Enter your email'/>
                    </div>

                    <div className={`${styles.input} ${styles['password-input']} ${pwShow ? styles.show : ''}`}>
                        <label for='password'>Password</label>
                        <input 
                            type={`${pwShow ? 'text' : 'password'}`}
                            name='password' id='password'
                            required placeholder='Enter your password'
                        />
                        <button 
                            type='button'
                            className={styles['toggle-password']}
                            onClick={handleEyeClick}
                            title={`${pwShow ? 'Hide password' : 'Show password'}`}
                        >
                            <img 
                                src={`${pwShow ? eyeOff : eye}`}
                                alt={`${pwShow ? 'Hide password' : 'Show password'}`}
                            />
                        </button>
                    </div>

                    <button class={styles.btn} type='submit'>Log In</button>
                </form>

                <div class={styles['other-actions']}>
                    <p>Forgot password?</p>
                    <Link to='/sign-up'>Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default LogIn;