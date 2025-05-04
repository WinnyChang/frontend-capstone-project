import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import styles from './SignUp.module.css';
import eyeOff from '../../images/eye-off.png'
import eye from '../../images/eye.png'

function SignUp() {
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pwShow, setPwShow] = useState(false);
    const [showerr, setShowerr] = useState('');
    
    const handleEyeClick = () => setPwShow(prev => !prev);
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();  // Prevent default form submission
        setShowerr('');  // Clear previous errors
        try {
            const response = await fetch(`${API_URL}/api/auth/sign-up`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role, name, phone, email, password }),
            });
            const json = await response.json();
            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', name);
                sessionStorage.setItem('phone', phone);
                sessionStorage.setItem('email', email);
                navigate('/');  // Redirect user to home page
                window.location.reload();  // Refresh the page
            } else if (json.error) {
                const errorMessages = Array.isArray(json.error) 
                    ? json.error.map(err => err.msg).join('\n')
                    : json.error;
                    setShowerr(errorMessages);
            }
        } catch (err) {
            setShowerr('Unknown error');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles['form-container']}>
                <form onSubmit={signUp}>
                    <h1>Sign Up</h1>

                    <div className={`${styles.input} ${styles['custom-select']}`}>
                        <label htmlFor='role'>Role</label>
                        <select 
                            name='role' id='role' required
                            value={role} onChange={e => setRole(e.target.value)}
                        >
                            <option value='' disabled hidden>Select role</option>
                            <option value='Patient'>Patient</option>
                            <option value='Doctor'>Doctor</option>
                        </select>
                    </div>

                    <div className={styles.input}>
                        <label htmlFor='name'>Name</label>
                        <input 
                            type='text' name='name' id='name' required placeholder='Enter your name'
                            value={name} onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className={styles.input}>
                        <label htmlFor='phone'>Phone</label>
                        <input 
                            type='tel' name='phone' id='phone' required
                            placeholder='Enter your phone number' pattern='[0-9]{10}'
                            value={phone} onChange={e => setPhone(e.target.value)}
                        />
                    </div>

                    <div className={styles.input}>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email' name='email' id='email' required placeholder='Enter your email'
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
                    {showerr && <div style={{ color: 'red', whiteSpace: 'pre-line' }}>{showerr}</div>}

                    <button className={styles.btn} type='submit'>Sign Up</button>
                </form>

                <div className={styles.member}>
                    <p>Already a member?</p>
                    <Link to='/log-in'>Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;