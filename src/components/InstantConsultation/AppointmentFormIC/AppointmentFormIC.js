import React, { useState } from 'react'
import styles from './AppointmentFormIC.module.css';;

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, phone });
      setName('');
      setPhone('');
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
            <button className={styles['book-btn']} type="submit">Book Now</button>
        </form>
    );
  };

export default AppointmentFormIC