import React, { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { API_URL } from '../../config';
import styles from './LogIn.module.css';
import eyeOff from '../../images/eye-off.png'
import eye from '../../images/eye.png'

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pwShow, setPwShow] = useState(false);

    const handleEyeClick = () => setPwShow(prev => !prev);
    const navigate = useNavigate();

    // If user is already authenticated, redirect to home page
    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate('/');
        }
    }, []);

    const logIn = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/api/auth/log-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const json = await res.json();
        if (json.authtoken) {
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('email', email);
            navigate('/');
            window.location.reload();
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    alert(error.msg);
                }
            } else {
                alert(json.error);
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles['form-container']}>
                <form onSubmit={logIn}>
                    <h1>Log In</h1>

                    <div className={styles.input}>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email' name='email' id='email' 
                            required placeholder='Enter your email'
                            value={email} onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={`${styles.input} ${styles['password-input']} ${pwShow ? styles.show : ''}`}>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type={pwShow ? 'text' : 'password'}
                            name='password' id='password'
                            required placeholder='Enter your password'
                            value={password} onChange={e => setPassword(e.target.value)}
                        />
                        <button 
                            type='button'
                            className={styles['toggle-password']}
                            onClick={handleEyeClick}
                            title={pwShow ? 'Hide password' : 'Show password'}
                        >
                            <img 
                                src={pwShow ? eyeOff : eye}
                                alt={pwShow ? 'Hide password' : 'Show password'}
                            />
                        </button>
                    </div>

                    <button className={styles.btn} type='submit'>Log In</button>
                </form>

                <div className={styles['other-actions']}>
                    <p>Forgot password?</p>
                    <Link to='/sign-up'>Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default LogIn;