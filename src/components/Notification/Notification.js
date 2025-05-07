import React, { useEffect, useState } from 'react';
import styles from './Notification.module.css';

const Notification = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // Function to load appointments from localStorage
  const loadAppointments = () => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments'));
    setAppointments(Array.isArray(storedAppointments) ? storedAppointments : []);
  };

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) setIsLoggedIn(true);
    loadAppointments();
    
    // Listen for custom event
    const handleAppointmentsChanged = () => loadAppointments();
    window.addEventListener('appointmentsChanged', handleAppointmentsChanged);

    // Cleanup to remove the listener when component unmounts
    return () => {
        window.removeEventListener('appointmentsChanged', handleAppointmentsChanged);
      };
  }, []); // Empty dependency array ensures useEffect only runs once on mount

  return (
    <div>
      {/* Display appointment details if user is logged in and appointmentData is available */}
      {isLoggedIn && appointments.length > 0 && (
        <>
          <div className={styles.container}>
            <h2>Your Appointment</h2>
            {appointments.map((appointment, idx) => (
                <div key={appointment.id || idx} className={styles.appointmentCard}>
                    <p>Doctor: {appointment.doctorName}</p>
                    <p style={{ marginBottom: '12px' }}>Specialty: {appointment.doctorSpecialty}</p>
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