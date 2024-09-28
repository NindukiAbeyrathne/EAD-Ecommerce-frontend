
import React, { useState, useEffect } from 'react';

const VendorManagementPage = () => {
  const [vendors, setVendors] = useState([]);
  const [newVendor, setNewVendor] = useState({ name: '', email: '' });
  const [customerRankings, setCustomerRankings] = useState([]);

  useEffect(() => {
    // Mock vendor data
    const mockVendors = [
      { id: 1, name: 'Vendor A', email: 'vendorA@example.com', averageRanking: 4.5 },
      { id: 2, name: 'Vendor B', email: 'vendorB@example.com', averageRanking: 3.8 },
    ];
    setVendors(mockVendors);

    // Mock customer rankings data
    const mockRankings = [
      { id: 1, customerName: 'Customer X', vendorName: 'Vendor A', rating: 5, comment: 'Great service!' },
      { id: 2, customerName: 'Customer Y', vendorName: 'Vendor B', rating: 4, comment: 'Good product!' },
    ];
    setCustomerRankings(mockRankings);
  }, []);

  const handleCreateVendor = () => {
    const newVendorEntry = { id: vendors.length + 1, ...newVendor, averageRanking: 'N/A' };
    setVendors([...vendors, newVendorEntry]);
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
            {vendor.name} ({vendor.email}) - Average Ranking: {vendor.averageRanking}
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
