// src/components/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductManagemant from "../../admin_pages/ProductManagementPage";

import '../../../../styles/admin.css'; // Ensure this CSS file exists

const AdminDashboard = () => {
  return (
    
    <div className="admin-dashboard-container">
 
       
       < ProductManagemant/>
        
        
        <div className="admin-actions">
          
        </div>
   
    </div>
  );
};

export default AdminDashboard;
