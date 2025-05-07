import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styles from './ReviewForm.module.css';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const initialRows = [
    {
      date: '02-16-2015',
      doctorName: 'Dr. Megan Blake',
      doctorSpecialty: 'Dentist',
      preferredName: '',
      review: '',
      disabled: false,
    },
    {
      date: '03-08-2025',
      doctorName: 'Dr. Thomas Reid',
      doctorSpecialty: 'Physical Therapist',
      preferredName: '',
      review: '',
      disabled: false,
    }
];

const ReviewForm = () => {
    const [rows, setRows] = useState(initialRows);
    const [activeRow, setActiveRow] = useState(null);
    const [form, setForm] = useState({ preferredName: '', review: '', rating: 0 });
    const [ratingError, setRatingError] = useState(false);

    // Open form for a specific row
    const handleGiveReview = (rowIdx) => {
        setActiveRow(rowIdx);
        setForm({ preferredName: '', review: '' });
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Rating validation (required field)
        if (!form.rating || form.rating === 0) {
            setRatingError(true);
            return;
        }
        setRatingError(false);

        setRows(rows.map((row, idx) =>
          idx === activeRow
            ? { 
                ...row, 
                review: form.review, 
                preferredName: form.preferredName,
                rating: form.rating,
                disabled: true 
            }
            : row
        ));
        setActiveRow(null);
    };


    return (
        <div className={styles.reviews}>
            <h1>Reviews</h1>
            <p>Share your consultation experience to help us improve!</p>
            <div className={styles['table-container']}>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Doctor Name</th>
                            <th>Doctor Specialty</th>
                            <th style={{width:'200px'}}>Give Review</th>
                            <th style={{width:'450px'}}>Review Given</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr key={idx}>
                                <td>{row.date}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>{row.doctorName}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>{row.doctorSpecialty}</td>
                                <td>
                                    <button
                                        onClick={() => handleGiveReview(idx)}
                                        disabled={row.disabled}
                                    >
                                        Give Review
                                    </button>
                                </td>
                                <td style={{ textAlign: 'left' }}>
                                    {row.review && (
                                        <>
                                            <div className={styles['stars-value']}>
                                                <Rating
                                                    name='read-only'
                                                    value={row.rating}
                                                    readOnly
                                                    size='large'
                                                    icon={<StarIcon style={{ color: '#ffcc00' }} />}
                                                    emptyIcon={<StarIcon style={{ color: '#dcdfe4' }} />}
                                                />
                                                <span className={styles['rating-value']}>{row.rating} / 5</span>
                                            </div>
                                            <div style={{ marginTop: '6px' }}>
                                                <strong>{row.preferredName ? row.preferredName + ': ' : ''}</strong>{row.review}
                                            </div>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Popup
                modal
                open={activeRow !== null}
                onClose={() => setActiveRow(null)}
                contentStyle={{ width: '400px', padding: '24px', borderRadius: '8px' }}
                overlayStyle={{ background: 'rgba(0,0,0,0.7)' }}
            >
                <form 
                    onSubmit={handleSubmit} 
                    className={styles.form}
                >
                    <h2>Give Review</h2>
                    <div className={styles.info}>
                        <h3>Consultation Info</h3>
                        <p>Date: {activeRow !== null ? rows[activeRow].date : ''}</p>
                        <p>Doctor Name: {activeRow !== null ? rows[activeRow].doctorName : ''}</p>
                        <p>Doctor Specialty: {activeRow !== null ? rows[activeRow].doctorSpecialty : ''}</p>
                    </div>

                    <div className={styles.input}>
                        <label htmlFor='preferredName'>Preferred Name</label>
                        <input
                            name='preferredName'
                            placeholder='Enter your preferred name'
                            value={form.preferredName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <div className={styles.input}>
                        <label htmlFor='review'>Review</label>
                        <textarea
                            name='review'
                            placeholder='Write your review'
                            value={form.review}
                            onChange={handleInputChange}
                            required
                            rows={6}
                        />
                    </div>

                    <div className={styles.input}>
                        <label>Rating</label>
                        <div className={styles['stars-value']}>
                            <Rating
                                name='rating'
                                value={form.rating}
                                onChange={(event, newValue) => {
                                    setForm({ ...form, rating: newValue });
                                    if (newValue) setRatingError(false);
                                }}
                                precision={0.5}
                                size='large'
                                icon={<StarIcon style={{ color: '#ffcc00' }} />}
                                emptyIcon={<StarIcon style={{ color: '#dcdfe4' }} />}
                            />
                            <span className={styles['rating-value']}>{form.rating} / 5</span>
                        </div>
                        {ratingError && (
                            <span style={{ color: '#e2483d', fontSize: '16px', fontWeight: '500'}}>
                                Please select a rating.
                            </span>
                        )}

                    </div>
                    
                    <div className={styles.buttons}>
                        <button className={styles.cancel} type='button' onClick={() => setActiveRow(null)}>Cancel</button>
                        <button className={styles.submit} type='submit'>Submit</button>
                    </div>
                </form>
            </Popup>
        </div>
    )
}

export default ReviewForm