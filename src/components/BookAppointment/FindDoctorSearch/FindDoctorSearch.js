import React, { useState } from 'react';
import styles from './FindDoctorSearch.module.css';
import { useNavigate } from 'react-router-dom';
import search from '../../../images/search.png';

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician'
]

const FindDoctorSearch = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    const navigate = useNavigate();
    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/appointments?speciality=${speciality}`);
        window.location.reload();
    }
    return (
        <div className={styles['find-doctor']}>
            <center>
                <h1>Find a doctor at your own ease</h1>
                <div className={styles['search-container']}>
                    <div className={styles['search-box']}>
                        <input 
                            type='text' className={styles['search-box']}
                            placeholder='Search doctors by specialty' 
                            onFocus={() => setDoctorResultHidden(false)} 
                            onBlur={() => setDoctorResultHidden(true)} 
                            value={searchDoctor} onChange={(e) => setSearchDoctor(e.target.value)} 
                        />
                        <img className={styles['search-icon']} src={search} alt=''/>
                        <div className={styles['specialties']} hidden={doctorResultHidden}>
                            {
                                specialities.map(speciality => 
                                    <div className={styles['specialty']} key={speciality} onMouseDown={() => handleDoctorSelect(speciality)}>
                                        <span>{speciality}</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default FindDoctorSearch