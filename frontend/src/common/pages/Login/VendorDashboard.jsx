import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function VendorDashboard() {
  return (
    <div>
      <h1>Vendor Dashboard</h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink className="nav-link" to="products" activeClassName="active">Product Management</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="inventory" activeClassName="active">Inventory Management</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="orders" activeClassName="active">Order Management</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="feedback" activeClassName="active">Vendor Feedback</NavLink>
        </li>
      </ul>

      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
}

export default VendorDashboard;
