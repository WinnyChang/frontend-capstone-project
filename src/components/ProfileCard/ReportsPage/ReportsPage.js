import React from 'react';
import styles from './ReportsPage.module.css';

const rows = [
    {
      date: '02-16-2015',
      doctorName: 'Dr. Megan Blake',
      doctorSpecialty: 'Dentist',
      reportLink: '',
    },
    {
      date: '03-08-2025',
      doctorName: 'Dr. Thomas Reid',
      doctorSpecialty: 'Physical Therapist',
      reportLink: '',
    }
];

const ReportsPage = () => {
    return (
        <div className={styles.reports}>
            <h1>Reports</h1>
            <p>View or download your consultation report.</p>
            <div className={styles['table-container']}>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Doctor Name</th>
                            <th>Doctor Specialty</th>
                            <th style={{width:'450px'}}>View / Download Report</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr key={idx}>
                                <td>{row.date}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>{row.doctorName}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>{row.doctorSpecialty}</td>
                                <td>
                                    <div className={styles['report-cell']}>
                                        <button onClick={() => {}}>
                                            View in New Tab
                                        </button>
                                        <button onClick={() => {}}>
                                            Download
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReportsPage