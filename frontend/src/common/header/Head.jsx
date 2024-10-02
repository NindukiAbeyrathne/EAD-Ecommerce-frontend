import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Head.css'; // Make sure you have CSS for styling
import logo from '../assets/images/logo.jpg'; 

const Head = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isVendor');
    localStorage.removeItem('isCSR');
    localStorage.removeItem('isLoggedIn');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div>
      <section className='head'>
        <div className='container d_flex'>
          {/* Logo */}
          <div className='logo'>
            <img src={logo} alt='Organization Logo' /> {/* Organization Logo */}
          </div>

          {/* Search Bar */}
          <div className='search-box'>
            <input type='text' placeholder='Search for products...' />
            <button type='button'>
              <i className='fa fa-search'></i>
            </button>
          </div>

          {/* Account and Cart */}
          <div className='right-icons d_flex'>
            {/* Account */}
            <div className='account'>
              <Link to='/account'>
                <i className='fa fa-user'></i>
              </Link>
            </div>

            {/* Cart */}
            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-cart'></i>
                <span className='cart-count'>0</span> {/* Cart item count */}
              </Link>
            </div>

            {/* Logout Icon */}
            <div className='logout'>
              <button type='button' onClick={handleLogout} className='btn-logout'>
                <i className='fa fa-sign-out-alt'></i> {/* FontAwesome icon for logout */}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Head;
