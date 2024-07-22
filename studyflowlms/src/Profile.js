import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  useEffect(() => {
    console.log('Fetching user data...');
    axios.get('http://localhost:5000/api/auth/user', { withCredentials: true })
      .then(response => {
        console.log('User data fetched:', response.data);
        setUser(response.data);
        setFormData({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:5000/api/auth/user', formData, { withCredentials: true })
      .then(response => {
        console.log('Profile updated:', response.data);
        setUser(response.data);
        alert('Profile updated successfully');
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome, {user.first_name}!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label><br />
        <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required /><br /><br />

        <label htmlFor="last_name">Last Name:</label><br />
        <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required /><br /><br />

        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br /><br />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
