// src/common/pages/Admin/AdminManageUsersPage.jsx
import React, { useState } from 'react';
import '../../../styles/admin_manageuser.css'; // Make sure to import the CSS file

// Initial mock data for Vendors and CSRs
const mockVendors = [
  { id: 1, name: 'Vendor A', email: 'vendorA@example.com', role: 'Vendor', businessCategory: 'Electronics', phoneNumber: '123-456-7890' },
  { id: 2, name: 'Vendor B', email: 'vendorB@example.com', role: 'Vendor', businessCategory: 'Fashion', phoneNumber: '987-654-3210' }
];

const mockCSRs = [
  { id: 1, name: 'CSR A', email: 'csrA@example.com', role: 'CSR', jobRole: 'Support Specialist', phoneNumber: '123-456-7890' },
  { id: 2, name: 'CSR B', email: 'csrB@example.com', role: 'CSR', jobRole: 'Customer Success', phoneNumber: '987-654-3210' }
];

const AdminManageUsersPage = () => {
  const [vendors, setVendors] = useState(mockVendors);
  const [csrs, setCSRs] = useState(mockCSRs);
  const [newUser, setNewUser] = useState({ name: '', businessCategory: '', email: '', password: '', phoneNumber: '', jobRole: '', role: 'Vendor' });
  const [isRegistering, setIsRegistering] = useState(true); // State to toggle between register and update

  const handleCreateUser = () => {
    const newUserEntry = {
      id: newUser.role === 'Vendor' ? vendors.length + 1 : csrs.length + 1,
      ...newUser
    };

    if (newUser.role === 'Vendor') {
      setVendors([...vendors, newUserEntry]);
    } else if (newUser.role === 'CSR') {
      setCSRs([...csrs, newUserEntry]);
    }

    setNewUser({ name: '', businessCategory: '', email: '', password: '', phoneNumber: '', jobRole: '', role: 'Vendor' });
  };

  const handleDeleteUser = (id, role) => {
    if (role === 'Vendor') {
      setVendors(vendors.filter((vendor) => vendor.id !== id));
    } else if (role === 'CSR') {
      setCSRs(csrs.filter((csr) => csr.id !== id));
    }
  };

  const handleUpdateUser = (id, updatedUser) => {
    if (updatedUser.role === 'Vendor') {
      setVendors(vendors.map((vendor) => (vendor.id === id ? { ...vendor, ...updatedUser } : vendor)));
    } else if (updatedUser.role === 'CSR') {
      setCSRs(csrs.map((csr) => (csr.id === id ? { ...csr, ...updatedUser } : csr)));
    }
  };

  return (
    <div className="admin-manage-users-page">
      <h2>Manage Users</h2>
      
      <div className="user-action-buttons">
        <button onClick={() => setIsRegistering(true)} className={isRegistering ? 'active' : ''}>Register User</button>
        <button onClick={() => setIsRegistering(false)} className={!isRegistering ? 'active' : ''}>Update User</button>
      </div>

      {/* User Registration Section */}
      {isRegistering ? (
        <div className="create-user-section">
          <h3>Register New {newUser.role === 'Vendor' ? 'Vendor' : 'CSR'}</h3>

          <div className="form-group">
            <label>{newUser.role === 'Vendor' ? 'Business Name' : 'Full Name'}:</label>
            <input
              type="text"
              placeholder={newUser.role === 'Vendor' ? 'Business Name' : 'Full Name'}
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>

          {newUser.role === 'Vendor' && (
            <div className="form-group">
              <label>Business Category:</label>
              <input
                type="text"
                placeholder="Business Category"
                value={newUser.businessCategory}
                onChange={(e) => setNewUser({ ...newUser, businessCategory: e.target.value })}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={newUser.phoneNumber}
              onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
              required
            />
          </div>

          {newUser.role === 'CSR' && (
            <div className="form-group">
              <label>Job Role:</label>
              <input
                type="text"
                placeholder="Job Role"
                value={newUser.jobRole}
                onChange={(e) => setNewUser({ ...newUser, jobRole: e.target.value })}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Role:</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="Vendor">Vendor</option>
              <option value="CSR">CSR</option>
            </select>
          </div>

          <button className="btn btn-primary" onClick={handleCreateUser}>
            Register {newUser.role === 'Vendor' ? 'Vendor' : 'CSR'}
          </button>
        </div>
      ) : (
        // Update User Section
        <div className="update-user-section">
          <h3>Update User</h3>
          <div className="user-lists">
            <div className="vendor-list">
              <h4>Vendors</h4>
              <ul>
                {vendors.map((vendor) => (
                  <li key={vendor.id}>
                    {vendor.name} ({vendor.email}, {vendor.businessCategory}, {vendor.phoneNumber})
                    <button onClick={() => handleDeleteUser(vendor.id, 'Vendor')}>Delete</button>
                    <button onClick={() => handleUpdateUser(vendor.id, { ...vendor })}>
                      Update
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="csr-list">
              <h4>Customer Service Representatives (CSRs)</h4>
              <ul>
                {csrs.map((csr) => (
                  <li key={csr.id}>
                    {csr.name} ({csr.email}, {csr.jobRole}, {csr.phoneNumber})
                    <button onClick={() => handleDeleteUser(csr.id, 'CSR')}>Delete</button>
                    <button onClick={() => handleUpdateUser(csr.id, { ...csr })}>
                      Update
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageUsersPage;
