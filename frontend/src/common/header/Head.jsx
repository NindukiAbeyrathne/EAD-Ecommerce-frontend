import React from 'react';
import { Link } from 'react-router-dom';
import './Head.css'; // Make sure you have CSS for styling
import logo from '../assets/images/logo.jpg'; 

const Head = () => {
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Head;
