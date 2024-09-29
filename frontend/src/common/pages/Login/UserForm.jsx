// src/components/UserForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import mockUsers from '../Data/mockUsers';       // Import mockUsers from the mock data file

const UserForm = () => {
  const [email, setEmail] = useState('');        // State to manage email input
  const [password, setPassword] = useState('');  // State to manage password input
  const [message, setMessage] = useState('');    // State for feedback messages
  const navigate = useNavigate();                // useNavigate hook for redirection

  // Function to handle form submission and login validation
  const handleLogin = (e) => {
    e.preventDefault();

    // Find the user from mockUsers based on email and password
    const foundUser = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    // If user is found, check their role
    if (foundUser) {
      setMessage(`Logged in as ${foundUser.role}`);

      // If the user is an admin, redirect to the admin dashboard
      if (foundUser.role === 'Administrator') {
        localStorage.setItem('isAdmin', true);  // Store admin status in localStorage
        navigate('/admin/dashboard');          // Redirect to the admin dashboard
      }
      // Handle other roles (e.g., Vendor, CSR)
      else if (foundUser.role === 'Vendor') {
        setMessage('Logged in as Vendor. Redirect to vendor section...');
        // Add redirection or additional logic for Vendor
      } 
      else if (foundUser.role === 'CSR') {
        setMessage('Logged in as CSR. Redirect to CSR section...');
        // Add redirection or additional logic for CSR
      }
    } else {
      setMessage('Invalid credentials');        // If no user is found, show an error message
    }
  };

  return (
    <div className="user-form-page">
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // Update email state
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Update password state
          required
        />
        <button className="btn btn-primary" type="submit">Login</button>
      </form>

      {/* Display message after form submission */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserForm;
