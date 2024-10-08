import React, { useState, useEffect } from 'react';
import '../../../styles/admin_manageuser.css'; // Ensure correct path to CSS

const AdminManageUsersPage = () => {
  const [vendors, setVendors] = useState([]);
  const [csrs, setCSRs] = useState([]);
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
                    <tr key={vendor.id}>
                      <td>{vendor.name}</td>
                      <td>{vendor.email}</td>
                      <td>{vendor.phoneNumber}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDeleteUser(vendor.id, 'Vendor')}>Delete</button>
                        <button className="btn btn-secondary" onClick={() => handleUpdateUser(vendor.id, { ...vendor })}>
                          Update
                        </button>
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {csrs.map((csr) => (
                    <tr key={csr.id}>
                      <td>{csr.name}</td>
                      <td>{csr.email}</td>
                      <td>{csr.phoneNumber}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDeleteUser(csr.id, 'CSR')}>Delete</button>
                        <button className="btn btn-secondary" onClick={() => handleUpdateUser(csr.id, { ...csr })}>
                          Update
                        </button>
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
