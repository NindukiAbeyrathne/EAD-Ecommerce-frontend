// src/components/csr/ManageUsers.jsx
import React, { useState, useEffect } from 'react';
import   '../../../styles/csr.css'
// Mock user data for demonstration purposes
const mockUserData = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "pending", profile: "Customer" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "active", profile: "Customer" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "deactivated", profile: "Customer" },
];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Normally, you would fetch the users from an API
    // setUsers(dataFromAPI);
    setUsers(mockUserData); // Using mock data for now
  }, []);

  const approveUser = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: 'active' } : user
    ));
  };

  const denyUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const reactivateUser = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: 'active' } : user
    ));
  };

  const deactivateUser = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: 'deactivated' } : user
    ));
  };

  const updateUserProfile = (id, newProfile) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, profile: newProfile } : user
    ));
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      <p>Approve/Deny customer account requests, update profiles, and manage accounts.</p>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Profile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.profile}</td>
              <td>
                {user.status === 'pending' && (
                  <>
                    <button onClick={() => approveUser(user.id)}>Approve</button>
                    <button onClick={() => denyUser(user.id)}>Deny</button>
                  </>
                )}
                {user.status === 'deactivated' && (
                  <button onClick={() => reactivateUser(user.id)}>Reactivate</button>
                )}
                {user.status === 'active' && (
                  <>
                    <button onClick={() => deactivateUser(user.id)}>Deactivate</button>
                    <button onClick={() => updateUserProfile(user.id, 'VIP')}>Upgrade to VIP</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;