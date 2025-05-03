import React, { useState } from 'react';
import styles from './SignUp.module.css';
import eyeOff from '../../images/eye-off.png'
import eye from '../../images/eye.png'

function SignUp() {
    const [pwShow, setPwShow] = useState(false);

    const handleEyeClick = () => {
        setPwShow(prev => !prev);
    };

    return (
        <div className={styles.container}>
            <div className={styles['form-container']}>
                <form>
                    <h1>Sign Up</h1>

                    <div className={`${styles.input} ${styles['custom-select']}`}>
                        <label for='role'>Role</label>
                        <select name='role' id='role' required>
                            <option value='' disabled selected hidden>Select role</option>
                            <option value='Patient'>Patient</option>
                            <option value='Doctor'>Doctor</option>
                        </select>
                    </div>

                    <div className={styles.input}>
                        <label for='name'>Name</label>
                        <input type='text' name='name' id='name' required placeholder='Enter your name'/>
                    </div>

                    <div className={styles.input}>
                        <label for='phone'>Phone</label>
                        <input type='tel' name='phone' id='phone' required placeholder='Enter your phone number'/>
                    </div>

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

                    <button className={styles.btn} type='submit'>Sign Up</button>
                </form>

                <div className={styles.member}>
                    <p>Already a member?</p>
                    <a href='../LogIn/LogIn.html'>Log in</a>
                </div>
            </div>
        </div>
    );
};

export default SignUp;