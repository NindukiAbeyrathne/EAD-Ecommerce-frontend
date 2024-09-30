// src/components/common/NavigationBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/csr.css";

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <ul>
        <li>
          <Link to="/csr/dashboard">
            <button className="nav-btn">Dashboard</button>
          </Link>
        </li>
        <li>
          <Link to="/csr/manage-users">
            <button className="nav-btn">Manage Users</button>
          </Link>
        </li>
        <li>
          <Link to="/csr/manage-orders">
            <button className="nav-btn">Manage Orders</button>
          </Link>
        </li>
        <li>
          <Link to="/csr/view-vendors-products">
            <button className="nav-btn">Vendors & Products</button>
          </Link>
        </li>
        <li>
          <Link to="/csr/track-deliveries">
            <button className="nav-btn">Track Deliveries</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;