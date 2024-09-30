import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/vendor.css'; // Assuming CSS file path for vendor styles

const VendorDashboard = () => {
  return (
    <div className="vendor-dashboard-container">
      <div className="vendor-dashboard">
        <h2>Vendor Dashboard</h2>
        <p>Welcome to your dashboard. Here you can manage your products, inventory, and view orders.</p>
        
        {/* Links to different vendor functionalities */}
        <div className="vendor-actions">
          <Link to="/vendor/manage-products">
            <button className="btn btn-primary">Manage Products</button>
          </Link>
          <Link to="/vendor/manage-inventory">
            <button className="btn btn-secondary">Manage Inventory</button>
          </Link>
          <Link to="/vendor/manage-orders">
            <button className="btn btn-success">Manage Orders</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
