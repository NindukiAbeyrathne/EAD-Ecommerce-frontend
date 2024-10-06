import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ProductManagementPage from './VendorProductManagement';
function VendorDashboard() {
  return (
    <div>
      <h1>Vendor Dashboard</h1>
      <ProductManagementPage/>
    </div>
  );
}

export default VendorDashboard;
