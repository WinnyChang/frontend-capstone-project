import React from 'react';
import styles from './ReportsPage.module.css';

const rows = [
    {
      date: '02-16-2025',
      doctorName: 'Dr. Megan Blake',
      doctorSpecialty: 'Dentist',
      reportLink: '/02162025-WP16888-Report.pdf',
    },
    {
      date: '03-08-2025',
      doctorName: 'Dr. Thomas Reid',
      doctorSpecialty: 'Physical Therapist',
      reportLink: '/03082025-WP16888-Report.pdf',
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
                                        <button onClick={() => window.open(row.reportLink, '_blank')}>
                                            View in New Tab
                                        </button>
                                        <a href={row.reportLink} download className={styles.download}>
                                            Download
                                        </a>
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