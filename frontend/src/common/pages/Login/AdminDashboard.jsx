
import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/admin.css';  // Create a new CSS file for this component

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>
        <p>Welcome to the admin section. Here you can manage users and other administrative tasks.</p>
        
        {/* Links to different admin functionalities */}
        <div className="admin-actions">
          <Link to="/admin/manage-users">
            <button className="btn btn-primary">Manage Users</button>
          </Link>
          
          <Link to="/admin/orders">
            <button className="btn btn-secondary">Manage Products</button>
          </Link>
          
          <Link to="/admin/inventory">
            <button className="btn btn-secondary">Inventory Management</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
