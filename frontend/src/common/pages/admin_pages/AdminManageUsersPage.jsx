import React, { useState, useEffect } from 'react';
import '../../../styles/admin_manageuser.css'; // Ensure correct path to CSS

const AdminManageUsersPage = () => {
  const [vendors, setVendors] = useState([]);
  const [csrs, setCSRs] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null); // Track which user is being edited
  const [updatedUser, setUpdatedUser] = useState({
    name: '', email: '', phoneNumber: '', role: ''
  });
  const [newUser, setNewUser] = useState({
    name: '', email: '', password: '', phoneNumber: '', role: 'Vendor'
  });
  const [isRegistering, setIsRegistering] = useState(true); // State to toggle between register and update
  const [message, setMessage] = useState(null); // To show success or error messages

  useEffect(() => {
    // Fetch all users on component mount (using the GET users endpoint)
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/');
        const data = await response.json();
        
        // Separate vendors and CSRs from the response based on roles
        const vendorsData = data.filter(user => user.role === 'Vendor');
        const csrData = data.filter(user => user.role === 'CSR');
        
        setVendors(vendorsData);
        setCSRs(csrData);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  // Use effect to clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000); // Message disappears after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timeout if component unmounts
    }
  }, [message]);

  const handleCreateUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          passwordHash: newUser.password,
          phoneNumber: newUser.phoneNumber,
          role: newUser.role,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: result.message });

        // Add user to the corresponding state based on the role
        if (newUser.role === 'Vendor') {
          setVendors([...vendors, result]);
        } else {
          setCSRs([...csrs, result]);
        }
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while creating the user.' });
    }

    setNewUser({ name: '', email: '', password: '', phoneNumber: '', role: 'Vendor' });
  };

  const handleDeleteUser = (id, role) => {
    if (role === 'Vendor') {
      setVendors(vendors.filter((vendor) => vendor.id !== id));
    } else if (role === 'CSR') {
      setCSRs(csrs.filter((csr) => csr.id !== id));
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/admin/update-profile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedUser.name,
          phoneNumber: updatedUser.phoneNumber
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: result.message });

        if (updatedUser.role === 'Vendor') {
          setVendors(vendors.map((vendor) => (vendor.id === id ? { ...vendor, ...updatedUser } : vendor)));
        } else if (updatedUser.role === 'CSR') {
          setCSRs(csrs.map((csr) => (csr.id === id ? { ...csr, ...updatedUser } : csr)));
        }

        // Clear editing state
        setEditingUserId(null);
        setUpdatedUser({ name: '', email: '', phoneNumber: '', role: '' });
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while updating the user.' });
    }
  };

  const handleDeactivateUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/users/${id}/deactivate`, {
        method: 'PUT',
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: result.message });

        // Optionally, remove the deactivated user from the list or update their status
        setVendors(vendors.map((vendor) => (vendor.id === id ? { ...vendor, isActive: false } : vendor)));
        setCSRs(csrs.map((csr) => (csr.id === id ? { ...csr, isActive: false } : csr)));
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while deactivating the user.' });
    }
  };

  const handleActivateUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/users/${id}/activate`, {
        method: 'PUT',
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: result.message });

        // Update the user's status to active
        setVendors(vendors.map((vendor) => (vendor.id === id ? { ...vendor, isActive: true } : vendor)));
        setCSRs(csrs.map((csr) => (csr.id === id ? { ...csr, isActive: true } : csr)));
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while activating the user.' });
    }
  };

  const startEditing = (user) => {
    setEditingUserId(user.id);
    setUpdatedUser({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role
    });
  };

  return (
    <div className="admin-manage-users-page">
      <h2>Manage Users</h2>

      <div className="user-action-buttons">
        <button onClick={() => setIsRegistering(true)} className={isRegistering ? 'active' : ''}>Register User</button>
        <button onClick={() => setIsRegistering(false)} className={!isRegistering ? 'active' : ''}>Update Users</button>
      </div>

      {/* Show messages */}
      {message && <div className={`message ${message.type}`}>{message.text}</div>}

      {/* User Registration Section */}
      {isRegistering ? (
        <div className="create-user-section">
          <h3>Register New {newUser.role === 'Vendor' ? 'Vendor' : 'CSR'}</h3>

          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              placeholder="Full Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>

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
        <div className="update-user-section">
          <div className="user-tables">
            <div className="vendor-table">
              <h4>Vendors</h4>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
                    <tr key={vendor.id}>
                      <td>{editingUserId === vendor.id ? (
                        <input
                          type="text"
                          value={updatedUser.name}
                          onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                        />
                      ) : vendor.name}</td>
                      <td>{vendor.email}</td>
                      <td>{editingUserId === vendor.id ? (
                        <input
                          type="tel"
                          value={updatedUser.phoneNumber}
                          onChange={(e) => setUpdatedUser({ ...updatedUser, phoneNumber: e.target.value })}
                        />
                      ) : vendor.phoneNumber}</td>
                      <td>{vendor.isActive ? 'Active' : 'Inactive'}</td>
                      <td>
                        {editingUserId === vendor.id ? (
                          <>
                            <button className="btn btn-success" onClick={() => handleUpdateUser(vendor.id)}>
                              Save
                            </button>
                            <button className="btn btn-secondary" onClick={() => setEditingUserId(null)}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                      
                            {vendor.isActive ? (
                              <button className="btn btn-warning" onClick={() => handleDeactivateUser(vendor.id)}>
                                Deactivate
                              </button>
                            ) : (
                              <button className="btn btn-primary" onClick={() => handleActivateUser(vendor.id)}>
                                Activate
                              </button>
                            )}
                            <button className="btn btn-secondary" onClick={() => startEditing(vendor)}>
                              Update
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="csr-table">
              <h4>Customer Service Representatives (CSRs)</h4>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {csrs.map((csr) => (
                    <tr key={csr.id}>
                      <td>{editingUserId === csr.id ? (
                        <input
                          type="text"
                          value={updatedUser.name}
                          onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                        />
                      ) : csr.name}</td>
                      <td>{csr.email}</td>
                      <td>{editingUserId === csr.id ? (
                        <input
                          type="tel"
                          value={updatedUser.phoneNumber}
                          onChange={(e) => setUpdatedUser({ ...updatedUser, phoneNumber: e.target.value })}
                        />
                      ) : csr.phoneNumber}</td>
                      <td>{csr.isActive ? 'Active' : 'Inactive'}</td>
                      <td>
                        {editingUserId === csr.id ? (
                          <>
                            <button className="btn btn-success" onClick={() => handleUpdateUser(csr.id)}>
                              Save
                            </button>
                            <button className="btn btn-secondary" onClick={() => setEditingUserId(null)}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
            
                            {csr.isActive ? (
                              <button className="btn btn-warning" onClick={() => handleDeactivateUser(csr.id)}>
                                Deactivate
                              </button>
                            ) : (
                              <button className="btn btn-primary" onClick={() => handleActivateUser(csr.id)}>
                                Activate
                              </button>
                            )}
                            <button className="btn btn-secondary" onClick={() => startEditing(csr)}>
                              Update
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageUsersPage;
