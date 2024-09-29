
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorManagementPage = () => {
  const [vendors, setVendors] = useState([]);
  const [newVendor, setNewVendor] = useState({ name: '', email: '' });
  const [customerRankings, setCustomerRankings] = useState([]);

  useEffect(() => {
    // Fetch vendor data when the component loads
    const fetchVendors = async () => {
      const response = await axios.get('http://localhost:5000/api/vendors');
      setVendors(response.data);
    };

    const fetchRankings = async () => {
      const rankingsResponse = await axios.get('http://localhost:5000/api/rankings');
      setCustomerRankings(rankingsResponse.data);
    };

    fetchVendors();
    fetchRankings();
  }, []);

  const handleCreateVendor = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/vendors', newVendor);
      setVendors([...vendors, response.data]);
    } catch (error) {
      console.error('Error creating vendor:', error);
    }
  };

  return (
    <div className="vendor-management-page">
      <h2>Vendor Management</h2>

      <div className="create-vendor-section">
        <h3>Create Vendor</h3>
        <input
          type="text"
          placeholder="Vendor Name"
          value={newVendor.name}
          onChange={e => setNewVendor({ ...newVendor, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Vendor Email"
          value={newVendor.email}
          onChange={e => setNewVendor({ ...newVendor, email: e.target.value })}
        />
        <button className="btn btn-primary" onClick={handleCreateVendor}>Create Vendor</button>
      </div>

      <h3>Vendor List</h3>
      <ul>
        {vendors.map(vendor => (
          <li key={vendor.id}>
            {vendor.name} ({vendor.email}) - Average Ranking: {vendor.averageRanking || 'N/A'}
          </li>
        ))}
      </ul>

      <h3>Customer Rankings and Comments</h3>
      <ul>
        {customerRankings.map(ranking => (
          <li key={ranking.id}>
            {ranking.customerName} rated {ranking.vendorName}: {ranking.rating}/5
            <br />
            Comment: {ranking.comment} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorManagementPage;
