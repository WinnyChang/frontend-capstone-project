import React, { useEffect, useState } from 'react';
import styles from './BookAppointment.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './DoctorCard/DoctorCard';

const BookAppointment = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    
    const getDoctorsDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
        .then(res => res.json())
        .then(data => {
            if (searchParams.get('speciality')) {
                const filtered = data.filter(doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase());
                setFilteredDoctors(filtered);
                setIsSearched(true);
            } else {
                setFilteredDoctors([]);
                setIsSearched(false);
            }
            setDoctors(data);
        })
        .catch(err => console.log(err));
    }

    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {
            const filtered = doctors.filter(doctor => doctor.speciality.toLowerCase().includes(searchText.toLowerCase()));
            setFilteredDoctors(filtered);
            setIsSearched(true);
            window.location.reload();
        }
    };
    
    const navigate = useNavigate();
    useEffect(() => {
        getDoctorsDetails();
        const authtoken = sessionStorage.getItem("auth-token");
        if (!authtoken) {
            navigate("/log-in");
        }
    }, [searchParams, navigate])

    return (
        <center>
            <div className={styles['searchpage-container']}>
                <FindDoctorSearch onSearch={handleSearch} />
                <div className={styles['search-results-container']}>
                    {isSearched ? (
                        <center>
                            {filteredDoctors.length > 0 ? (
                                <>
                                    <p>{filteredDoctors.length} doctors available. {searchParams.get('location')}</p>
                                    <p>Book an appointment with minimum wait-time & verified doctor details.</p>
                                    <div className={styles.cards}>
                                        {filteredDoctors.map(doctor => <DoctorCard {...doctor} key={doctor.name} />)}
                                    </div>
                                </>
                            ) : (
                                <p>No doctors found.</p>
                            )}
                        </center>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </center>
    )
}

export default BookAppointment;