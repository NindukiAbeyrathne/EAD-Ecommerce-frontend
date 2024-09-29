// src/components/admin/NavigationBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/admin.css"; // Assuming CSS file path

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <ul>
        <li>
          <Link to="/admin/products">
            <button className="nav-btn">Product Management</button>
          </Link>
        </li>
        <li>
          <Link to="/admin/orders">
            <button className="nav-btn">Order Management</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
