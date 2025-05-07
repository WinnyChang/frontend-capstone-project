import React, { useEffect, useState } from 'react';
import styles from './Notification.module.css';

const Notification = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    const storedAppointments = JSON.parse(localStorage.getItem('appointments'));
    if (storedEmail) {
      setIsLoggedIn(true);
    }
    if (Array.isArray(storedAppointments)) {
        setAppointments(storedAppointments);
    }
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  return (
    <div>
      {/* Display appointment details if user is logged in and appointmentData is available */}
      {isLoggedIn && appointments && (
        <>
          <div className={styles.container}>
            <h2>Your Appointment</h2>
            {appointments.map((appointment, idx) => (
                <div key={appointment.id || idx} className={styles.appointmentCard}>
                    <p>Doctor: {appointment.doctorName}</p>
                    <p style={{ marginBottom: '12px' }}>Specialty: {appointment.doctorSpeciality}</p>
                    <p>Patient: {appointment.name}</p>
                    <p>Phone: {appointment.phone}</p>
                    <p>Date: {appointment.date}</p>
                    <p>Time: {appointment.time}</p>
                </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;