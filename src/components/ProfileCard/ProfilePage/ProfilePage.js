import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);

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

      if (response.ok) {
        // Update the user details in session storage
        sessionStorage.setItem('name', updatedDetails.name);
        sessionStorage.setItem('phone', updatedDetails.phone);

        setUserDetails(updatedDetails);
        setEditMode(false);
        // Display success message to the user
        alert(`Profile Updated Successfully!`);
        navigate('/');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Render based on mode (edit / read)
  return (
    <div className={styles['profile-container']}>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type='email'
              name='email'
              value={userDetails.email}
              disabled // Disable the email field
            />
          </label>
          <label>
            Name
            <input
            type="text"
            name="name"
            value={updatedDetails.name}
            onChange={handleInputChange}
            />
          </label>
          <label>
            Phone
            <input
            type="text"
            name="phone"
            value={updatedDetails.phone}
            onChange={handleInputChange}
            />
          </label>
          <button type='submit'>Save</button>
        </form>
      ) : (
        <div className={styles['profile-details']}>
          <h1>Welcome, {userDetails.name}</h1>
            <p><b>Email:</b> {userDetails.email}</p>
            <p><b>Phone:</b> {userDetails.phone}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;