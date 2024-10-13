import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import './Navbar.css'; // Link to the CSS file for styling

const Navbar = () => {
  const [MobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user role from Redux store
  const userRole = useSelector((state) => state.auth.role);

  const renderNavLinks = () => {
    switch (userRole) {
      case 'Administrator':
        return (
          <>
            <li>
              <Link to='/admin/dashboard'>Home</Link>
            </li>
            <li>
              <Link to='/admin/manage-users'>Manage Users</Link>
            </li>
            <li>
              <Link to='/admin/orders'>Manage Orders</Link>
            </li>
            
            <li>
              <Link to='/admin/cancel-requests'>Cancel Orders</Link>
            </li>
            <li>
              <Link to='csr/manage-users'>Manage Customers</Link>
            </li>
          </>
        );
      case 'Vendor':
        return (
          <>
            <li>
              <Link to='/vendor/dashboard'>Home</Link>
            </li>
            <li>
              <Link to='/vendor/orders'>My Orders</Link>
            </li>
            <li>
              <Link to='/vendor/dashboard/feedback'>Customer Feedback</Link>
            </li>
          </>
        );
      case 'CSR':
        return (
          <>
            <li>
              <Link to='csr/manage-users'>Manage Customers</Link>
            </li>
            <li>
              <Link to='/csr/view-products'>View Products</Link>
            </li>
            <li>
              <Link to='/admin/orders'>Manage Orders</Link>
            </li>
          </>
        );
      default:
        return (
          <>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </>
        );
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear(); // Clear local storage on logout
    navigate('/UserForm');
  };

  return (
    <header className='header'>
      <div className='container d_flex'>
        {/* Logo/Shop Name */}
        <div className='shop-name'>
          <h1>Bella Vie</h1>
        </div>

        <div className='navlink'>
          <ul
            className={MobileMenu ? 'nav-links-MobileMenu' : 'link f_flex capitalize'}
            onClick={() => setMobileMenu(false)}
          >
            {renderNavLinks()}
          </ul>

          <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
            {MobileMenu ? <i className='fas fa-times close'></i> : <i className='fas fa-bars open'></i>}
          </button>
        </div>

        {/* Icons for Notifications, Profile, and Logout */}
        <div className='nav-icons'>
          {userRole === 'Vendor' && (
            <div className='notification-icon'>
              <Link to='/vendor/notifications'>
                <i className='fas fa-bell'></i>
              </Link>
            </div>
          )}
          <Link to='/profile'>
            <i className='fas fa-user-circle'></i>
          </Link>
          <button className='logout-button' onClick={handleLogout}>
            <i className='fas fa-sign-out-alt'></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
