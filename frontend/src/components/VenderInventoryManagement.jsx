import React, { useState, useEffect } from 'react';

function VenderInventoryManagement() {
  // Mock data for inventory
  const mockInventory = [
    {
      productId: 1,
      productName: 'Laptop Pro',
      quantity: 20,
      lowStockAlert: false,
    },
    {
      productId: 2,
      productName: 'Smartphone X',
      quantity: 5,
      lowStockAlert: true,
    },
    {
      productId: 3,
      productName: 'Wireless Earbuds',
      quantity: 100,
      lowStockAlert: false,
    },
  ];

  const [inventory, setInventory] = useState(mockInventory); // Set initial mock data
  const [searchQuery, setSearchQuery] = useState(''); // State to track search input

  // Filtered inventory based on search query
  const filteredInventory = inventory.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h2>Inventory Management</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search product..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
      />

      {/* Inventory Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Low Stock Alert</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.length > 0 ? (
            filteredInventory.map((item) => (
              <tr key={item.productId}>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>{item.lowStockAlert ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VenderInventoryManagement;
