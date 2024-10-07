import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ProductManagementPage from './VendorProductManagement';
function VendorDashboard() {
  return (
    <div>
      <ProductManagementPage/>
    </div>
  );
}

export default VendorDashboard;
