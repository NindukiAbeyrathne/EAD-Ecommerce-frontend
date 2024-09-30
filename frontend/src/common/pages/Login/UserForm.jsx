import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import mockUsers from '../Data/mockUsers';       // Import mockUsers from the mock data file
import "../../../styles/UserForm.css"   // Import the CSS file

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
        localStorage.setItem('isLoggedIn', true);  // Mark user as logged in
        navigate('/admin/dashboard');          // Redirect to the admin dashboard
      }
      // Redirect Vendor to the Vendor Dashboard
      else if (foundUser.role === 'Vendor') {
        localStorage.setItem('isVendor', true);  // Store vendor status in localStorage
        localStorage.setItem('isLoggedIn', true);  // Mark user as logged in
        navigate('/vendor/dashboard');           // Redirect to the vendor dashboard
      } 
      else if (foundUser.role === 'CSR') {
        localStorage.setItem('isCSR', true);  // Store CSR status in localStorage
        localStorage.setItem('isLoggedIn', true);  // Mark user as logged in
        navigate('/csr/dashboard'); 
        // setMessage('Logged in as CSR. Redirect to CSR section...');
        // Add redirection or additional logic for CSR
      }
    } else {
      setMessage('Invalid credentials');        // If no user is found, show an error message
    }
  };

  return (
    <div className="user-form-container">
      <div className="user-form">
        <h2 className="form-heading">Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Update email state
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Update password state
              required
            />
          </div>
          <button className="btn-submit" type="submit">Login</button>
        </form>
        {message && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
};

export default UserForm;
