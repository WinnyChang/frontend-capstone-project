import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styles from './DoctorCard.module.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm'
import { v4 as uuidv4 } from 'uuid';
import star from '../../../images/star.png';

const DoctorCard = ({ name, speciality, experience, ratings }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);
    setShowModal(false);
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      doctorName: name,
      dotorSpecialty: speciality,
      ...appointmentData,
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setShowModal(false);
  };
  
  // Save appointment data to local storage whenever it changes
  useEffect(() => {
      localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Load appointment data from local storage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('appointments');
    if (saved) setAppointments(JSON.parse(saved));
  }, []);

  return (
    <div className={styles['card-container']}>
        <div className={styles['card-top']}>
            <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' fill='#48696e' className='bi bi-person-fill' viewBox='0 0 16 16'> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
        </div>
        <div className={styles['card-bottom']}>
            <h2 className={styles['doctor-name']}>{name}</h2>
            <p className={styles['doctor-speciality']}>{speciality}</p>
            <p className={styles['doctor-experience']}>{experience} years experience</p>
            <div className={styles['doctor-ratings']}>
                {ratings.split('').map((char, index) =>
                    char === '⭐' ? <img key={index} src={star} alt='Star' /> : null
                )}
            </div>
            <button 
                className={`${styles['book-btn']} ${appointments.length === 0 ? '' : styles['cancel-btn']}`}
                onClick={() => setShowModal(true)}
            >
                {appointments.length === 0 ? 'Book Appointment' : 'Cancel Appointment'}
            </button>
        </div>

        <div>
            <Popup
                modal
                open={showModal}
                onClose={() => setShowModal(false)}
                contentStyle={{
                    width: '368px',
                    padding: '24px',
                    borderRadius: '8px',
                    background: '#fff',
                }}
                overlayStyle={{
                    background: 'rgba(0,0,0,0.7)'
                }}
            >
                {(close) => (
                    <div>
                        <div className={styles['doctor-info']}>
                            <div className={styles['profile-container']}>
                                <svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#48696e' className='bi bi-person-fill' viewBox='0 0 16 16'> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
                            </div>
                            <h2 className={styles['doctor-name']}>{name}</h2>
                            <p className={styles['doctor-speciality']}>{speciality}</p>
                            <p className={styles['doctor-experience']}>{experience} years experience</p>
                            <div className={styles['doctor-ratings']}>
                                {ratings.split('').map((char, index) =>
                                    char === '⭐' ? <img key={index} src={star} alt='Star' /> : null
                                )}
                            </div>
                        </div>

                        {appointments.length === 0 ? (
                            <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
                        ) : (
                            <>
                                <div className={styles['patient-info']}>
                                    <h2 className={styles.patient}>Scheduled Appointment</h2>
                                    {appointments.map((appointment) => (
                                        <div key={appointment.id}>
                                            <p>Name: {appointment.name}</p>
                                            <p>Phone: {appointment.phone}</p>
                                            <p>Date: {appointment.date}</p>
                                            <p>Time: {appointment.time}</p>
                                            <button 
                                                className={`${styles['book-btn']} ${styles['cancel-btn']}`} 
                                                onClick={() => handleCancel(appointment.id)}
                                            >
                                                Cancel Now
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </Popup> 
        </div>
    </div>
  );
};

export default DoctorCard;