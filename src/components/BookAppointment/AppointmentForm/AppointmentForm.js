import React, { useState } from 'react'
import styles from './AppointmentForm.module.css';;

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
  
    const today = new Date().toISOString().split('T')[0];  // Save current date for date selection restriction

    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, phone, date, time });
      setName('');
      setPhone('');
      setDate('');
      setTime('');
    };
  
    return (
        <form className={styles.book} onSubmit={handleFormSubmit}>
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
                <label htmlFor='date'>Date</label>
                <input 
                    type='date' name='date' id='date' required
                    value={date} min={today} onChange={e => setDate(e.target.value)}
                />
            </div>

            <div className={`${styles.input} ${styles['custom-select']}`}>
                <label htmlFor='time'>Time</label>
                <select 
                    name='time' id='time' required
                    value={time} onChange={e => setTime(e.target.value)}
                >
                    <option value='' disabled hidden>Select a time slot</option>
                    <option value='9 AM'>9 AM</option>
                    <option value='10 AM'>10 AM</option>
                    <option value='11 AM'>11 AM</option>
                    <option value='1 PM'>1 PM</option>
                    <option value='2 PM'>2 PM</option>
                    <option value='3 PM'>3 PM</option>
                    <option value='4 PM'>4 PM</option>
                </select>
            </div>
            <button className={styles['book-btn']} type="submit">Book Now</button>
        </form>
    );
  };

export default AppointmentForm