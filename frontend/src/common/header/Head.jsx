import React, { useState } from 'react'; // Import useState for managing state
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { logout } from '../../redux/authSlice'; // Import the logout action
import './Head.css'; // Make sure you have CSS for styling
import logo from '../assets/images/logo.jpg'; 

const Head = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch(); // Initialize useDispatch
  const products = useSelector((state) => state.products); // Assuming products are stored in Redux

  // Function to handle logout
  const handleLogout = () => {
    // Dispatch the logout action to update the Redux state
    dispatch(logout());

    // Clear user data from localStorage
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isVendor');
    localStorage.removeItem('isCSR');
    localStorage.removeItem('isLoggedIn');

    // Redirect to login page
    navigate('/UserForm');
  };

  // Function to handle search
  const handleSearch = () => {
    if (searchQuery.trim() === '') return; // Prevent empty search
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Navigate to search results page with the filtered products as state
    navigate('/search', { state: { products: filteredProducts } });
    
    // Clear the search input after search
    setSearchQuery('');
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
            <input 
              type='text' 
              placeholder='Search for products...' 
              value={searchQuery} // Bind the input value to state
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on change
            />
            <button type='button' onClick={handleSearch}> {/* Call handleSearch on click */}
              <i className='fa fa-search'></i>
            </button>
          </div>

          {/* Account and Cart */}
          <div className='right-icons d_flex mb3'>
            {/* Account */}
            <div className='account'>
              <Link to='/account'>
                <i className='fa fa-user'></i>
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
