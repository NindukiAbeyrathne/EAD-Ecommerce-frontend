import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state
import './Navbar.css'; // Link to the CSS file for styling

const Navbar = () => {
  const [MobileMenu, setMobileMenu] = useState(false);
  
  // Get user role from Redux store
  const userRole = useSelector((state) => state.auth.role); // Assuming role is stored in auth slice

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
              <Link to='/vendor/dashboard'>Vendor Dashboard</Link>
            </li>
            <li>
              <Link to='/vendor/orders'>My Orders</Link>
            </li>
            <li>
              <Link to='/vendor/products'>Manage Products</Link>
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

  return (
    <header className='header'>
      <div className='container d_flex'>
        <div className='categories d_flex'>
          {/* You can add category links here if needed */}
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
      </div>
    </header>
  );
};

export default Navbar;
