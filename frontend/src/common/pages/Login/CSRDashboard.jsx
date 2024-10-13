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
            <button className="btn btn-primary">Manage Customers</button>
          </Link>
          <Link to="/csr//view-products">
            <button className="btn btn-secondary">View Vendors & Products</button>
          </Link>
          <Link to="/admin/orders">
            <button className="btn btn-secondary">Manage Orders</button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default CSRDashboard;