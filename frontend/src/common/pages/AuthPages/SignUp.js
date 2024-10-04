import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate for redirection and Link for navigation
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import logo from "../../assets/images/logo.jpg"; // Import the company logo
import cartimg from "../../assets/images/cart.webp";

const SignUpForm = () => {
  const [email, setEmail] = useState('');         // State to manage email input
  const [password, setPassword] = useState('');   // State to manage password input
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming password
  const [role, setRole] = useState('');   // State to manage user role selection
  const [message, setMessage] = useState('');     // State for feedback messages
  const navigate = useNavigate();                 // useNavigate hook for redirection

  // Function to handle form submission
  const handleSignUp = (e) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match'); // Set error message for mismatched passwords
      return;
    }

    // Here, you would typically send the user data to your backend service
    const newUser = {
      email,
      passwordHash: password, // Ensure this is hashed in the backend
      role,
      isActive: false,        // Default inactive status
    };

    // Simulate a signup request (Replace with actual API call)
    console.log('New User:', newUser); // Replace this with your API call
    setMessage('Signup successful!'); // Simulated success message
    navigate('/login'); // Redirect to login page after successful signup
  };

  return (
    <div>
      {/* Blue ribbon at the top */}
      <div style={{ backgroundColor: '#0f3460', height: '50px' }}></div>

      {/* Main container for the sign-up form */}
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card d-flex flex-row" style={{ width: '950px', backgroundColor: '#FAF9F6' }}>
          <div className="col-md-6 p-4">
            <div className="text-center mb-4">
              <img src={logo} alt="Company Logo" className="mb-3" style={{ width: '150px' }} />
              <h2 className="form-heading">Create Your Account</h2>
            </div>
            <form onSubmit={handleSignUp}>
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label>Select Role</label>
                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)} // Update role state
                  required
                  style={{ height: '90%' }}
                >
                  <option value="select">Select</option>
                  <option value="Administrator">Administrator</option>
                  <option value="CSR">CSR Admin</option>
                  <option value="Vendor">Vendor</option>
                </select>
              </div>
              <button className="btn btn-primary w-100" type="submit">
                Sign Up
              </button>
            </form>

            {message && <p className="alert alert-danger mt-3">{message}</p>}

            <div className="text-center mt-3">
              <p>
                Already have an account? <Link to="/UserForm">Login</Link>
              </p>
            </div>
          </div>
          <div
            className="col-md-6 d-flex flex-column justify-content-center align-items-start p-4"
            style={{ backgroundColor: '#0f3460', color: 'white' }}
          >
            <h3 style={{ color: 'white', fontFamily: '-moz-initial', textAlign: 'center' }}>
              WELCOME TO OUR COMMUNITY
            </h3>
            <br />
            <p style={{ color: 'white', fontSize: '100%' }}>
              <img src={cartimg} alt="image Logo" style={{ width: '430px', height: '450px' }} />
              <br />
              <br />
              Join us today and experience a wide range of products tailored just for you. Sign up now to enjoy
              exclusive offers, personalized recommendations, and much more!
            </p>
          </div>
        </div>
      </div>

      {/* Blue ribbon at the bottom */}
      <div style={{ backgroundColor: '#0f3460', height: '50px', marginTop: 'auto' }}></div>
    </div>
  );
};

export default SignUpForm;
