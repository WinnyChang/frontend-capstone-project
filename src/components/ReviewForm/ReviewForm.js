import React from 'react';
import styles from './ReviewForm.module.css';

const ReviewForm = () => {
    return (
        <div className={styles.reviews}>
            <h1>Reviews</h1>
            <p>Share your consultation experience to help us improve!</p>
            <div className={styles['table-container']}>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Doctor Name</th>
                        <th>Doctor Specialty</th>
                        <th style={{width:'200px'}}>Give Review</th>
                        <th>Review Given</th> 
                    </tr>
                    <tr style={{height:'150px'}}>
                        <td>02/16/2015</td>
                        <td style={{whiteSpace:'nowrap'}}>Dr. Megan Blake</td>
                        <td style={{whiteSpace:'nowrap'}}>Dentist</td>
                        <td><button disabled>Give Review</button></td>
                        <td style={{textAlign:'left'}}>I had a tele-health consult with Dr. Megan Blake for tooth sensitivity, and she was great. She listened carefully, explained things clearly, and offered helpful next steps without any pressure. Highly recommend!</td>
                    </tr>
                    <tr style={{height:'150px'}}>
                        <td>03/08/2025</td>
                        <td style={{whiteSpace:'nowrap'}}>Dr. Thomas Reid</td>
                        <td style={{whiteSpace:'nowrap'}}>Physical Therapist</td>
                        <td><button>Give Review</button></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default ReviewForm