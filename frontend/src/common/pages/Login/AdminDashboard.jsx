// src/components/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin section. Here you can manage users and other administrative tasks.</p>
      
      {/* Links to different admin functionalities */}
      <div className="admin-actions">
        <Link to="/admin/manage-users">
          <button className="btn btn-primary">Manage Users</button>
        </Link>
        {/* Add more admin management actions as needed */}
        <Link to="/admin/manage-products">
          <button className="btn btn-secondary">Manage Products</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
