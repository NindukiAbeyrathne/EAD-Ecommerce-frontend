import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import './Navbar.css'; // Link to the CSS file for styling

const Navbar = () => {
  const [MobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch(); // Initialize useDispatch
  const products = useSelector((state) => state.products); // Assuming products are stored in Redux
  
  // Get user role from Redux store
  const userRole = useSelector((state) => state.auth.role);

  const renderNavLinks = () => {
    switch (userRole) {
      case 'Administrator':
        return (
          <>
            <li>
              <Link to='/admin/dashboard'> Home</Link>
            </li>
            <li>
              <Link to='/admin/manage-users'>Manage Users</Link>
            </li>
            <li>
              <Link to='/admin/orders'>Manage Orders</Link>
            </li>
            <li>
              <Link to='/admin/inventory'>Inventory Management</Link>
            </li>
          </>
        );
      case 'Vendor':
        return (
          <>
            <li>
              <Link to='/vendor/dashboard'> Home </Link>
            </li>
            <li>
              <Link to='/vendor/orders'>My Orders</Link>
            </li>
            <li>
              <Link to='/vendor/dashboard/feedback'>Customer Feedbacks</Link>
            </li>
          </>
        );
      case 'CSR':
        return (
          <>
            <li>
              <Link to='/csr/dashboard'>CSR Dashboard</Link>
            </li>
            <li>
              <Link to='/csr/support-tickets'>Support Tickets</Link>
            </li>
            <li>
              <Link to='/csr/reports'>Reports</Link>
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

  return (
    <header className='header'>
      <div className='container d_flex'>
        {/* Shop Name */}
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

        {/* Icons on the right side */}
        <div className='nav-icons'>
          <Link to='/search'>
            <i className='fas fa-search'></i>
          </Link>
          <Link to='/profile'>
            <i className='fas fa-user-circle'></i>
          </Link>
          <button onClick={handleLogout} >
            <i className='fas fa-sign-out-alt'></i> 
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
