import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate for redirection and Link for navigation
import mockUsers from '../Data/mockUsers'; // Import mockUsers from the mock data file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import logo from "../../assets/images/logo.jpg"; // Import the company logo
import cartimg2 from "../../assets/images/cart2.webp";

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
      // Redirect CSR to CSR Dashboard
      else if (foundUser.role === 'CSR') {
        localStorage.setItem('isCSR', true);  // Store CSR status in localStorage
        localStorage.setItem('isLoggedIn', true);  // Mark user as logged in
        navigate('/csr/dashboard');            // Redirect to CSR dashboard
      }
    } else {
      setMessage('Invalid credentials');        // If no user is found, show an error message
    }
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-between align-items-center vh-100 p-0">
      {/* Top blue ribbon */}
      <div className="w-100" style={{ backgroundColor: '#0f3460', height: '40px' }}></div>

      {/* Main content */}
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="card d-flex flex-row" style={{ width: '900px' ,backgroundColor:'#FAF9F6'}}>
          <div className="col-md-6 p-4">
            <div className="text-center mb-4">
              <img src={logo} alt="Company Logo" className="mb-3" style={{ width: '150px' }} />
              <h2 className="form-heading">Login to Your Account</h2>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}  // Update email state
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
                  onChange={(e) => setPassword(e.target.value)}  // Update password state
                  required
                />
              </div>
              <button className="btn btn-primary w-100" type="submit">
                Login
              </button>
            </form>

            {message && <p className="alert alert-danger mt-3">{message}</p>}

            <div className="text-center mt-3">
              <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-start p-4" style={{ backgroundColor: '#0f3460', color: 'white' }}>
            {/* Change the background color to blue and text color to white */}
            <h3 style={{  color: 'white' ,fontFamily:'-moz-initial',textAlign:'center'}} >WE ARE MORE THAN THE SHOPPING CART </h3><br/>
            <img src={cartimg2} alt="Company Logo" className="mb-3" style={{ width:"410px", height:"450px"}} /><br/>
            <p  style={{  color: 'white' ,fontSize:'100%'}}>
              Discover a wide range of products and enjoy a seamless shopping experience.
              Our application offers personalized recommendations, easy navigation, and secure payments.
              Join us and start exploring the best deals available just for you.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom blue ribbon */}
      <div className="w-100" style={{ backgroundColor: '#0f3460', height: '30px' }}></div>
    </div>
  );
};

export default UserForm;
