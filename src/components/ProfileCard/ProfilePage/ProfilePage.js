import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [showerr, setShowerr] = useState('');

  const navigate = useNavigate();
  
  // Fetch user profile data when the component mounts or updates
  useEffect(() => {
    const authtoken = sessionStorage.getItem('auth-token');
    if (!authtoken) {
      navigate('/log-in');
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  // Function to fetch user profile data from the API
  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem('auth-token');
      const email = sessionStorage.getItem('email'); // Get the email from session storage

      if (!authtoken) {
        navigate('/log-in');
      } else {
        const response = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            'Authorization': `Bearer ${authtoken}`,
            'Email': email, // Add the email to the headers
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUserDetails(user);
          setUpdatedDetails(user);
        } else {
          throw new Error('Failed to fetch user profile');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowerr('');  // Clear previous errors

    try {
      const authtoken = sessionStorage.getItem('auth-token');
      const email = sessionStorage.getItem('email'); // Get the email from session storage

      if (!authtoken || !email) {
        navigate('/log-in');
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authtoken}`,
          'Content-Type': 'application/json',
          'Email': email,
        },
        body: JSON.stringify(payload),
      });
      const json = await response.json();

      if (response.ok) {
        // Update the user details in session storage
        sessionStorage.setItem('name', updatedDetails.name);
        sessionStorage.setItem('phone', updatedDetails.phone);

        setUserDetails(updatedDetails);
        setEditMode(false);
        // Display success message to the user
        alert(`Profile Updated Successfully!`);
        navigate('/profile');
      } else if (json.errors) {
        const errorMessages = Array.isArray(json.errors) 
            ? json.errors.map(err => err.msg).join('\n')
            : json.errors;
            setShowerr(errorMessages);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Render based on mode (edit / read)
  return (
    <div className={styles.container}>
      { editMode ? (
        <form  className={styles.edit} onSubmit={handleSubmit}>
          <h1>Edit Profile</h1>
          <div className={styles.input}>
            <label htmlFor='email'>Email</label>
            <input 
              type='email' name='email' id='email' disabled
              value={userDetails.email}
            />
          </div>
          <div className={styles.input}>
            <label htmlFor='name'>Name</label>
            <input 
              type='text' name='name' id='name' required placeholder='Enter your name'
              value={updatedDetails.name} onChange={handleInputChange}
            />
          </div>
          <div className={styles.input}>
            <label htmlFor='phone'>Phone</label>
            <input 
              type='text' name='phone' id='phone' required placeholder='Enter your phone'
              value={updatedDetails.phone} onChange={handleInputChange}
            />
          </div>

          {/* Display error message if name or phone isn't valid */}
          {showerr && <div style={{ color: '#e2483d', fontSize: '16px', fontWeight: '500', whiteSpace: 'pre-line' }}>{showerr}</div>}
          
          <button type='submit'>Save</button>
        </form>
      ) : (
        <div className={styles.read}>
          <h1>Your Profile</h1>
          <p><b>Email:</b> {userDetails.email}</p>
          <p><b>Name:</b> {userDetails.name}</p>
          <p><b>Phone:</b> {userDetails.phone}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;