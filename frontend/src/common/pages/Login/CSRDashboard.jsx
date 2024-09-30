// src/components/csr/CSRDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/csr.css";  // Assuming you have this CSS file

const CSRDashboard = () => {
  return (
    <div className="csr-dashboard-container">
      <div className="csr-dashboard">
        <h2>CSR Dashboard</h2>
        <p>Manage customer accounts, orders, and assist with vendor-related inquiries.</p>
        
        <div className="csr-actions">
          <Link to="/csr/manage-users">
            <button className="btn btn-primary">Manage Users</button>
          </Link>
          <Link to="/csr/manage-orders">
            <button className="btn btn-secondary">Manage Orders</button>
          </Link>
          <Link to="/csr/manage-vendor-products">
            <button className="btn btn-secondary">View Vendors & Products</button>
          </Link>
          <Link to="/csr/manage-deliveries">
            <button className="btn btn-success">Track Deliveries</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CSRDashboard;
