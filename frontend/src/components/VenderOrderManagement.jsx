import React, { useState, useEffect } from 'react';

function VenderOrderManagement() {
  // Mock data for orders
  const mockOrders = [
    {
      id: '1001',
      customerName: 'John Doe',
      productName: 'Laptop Pro',
      status: 'Processing',
    },
    {
      id: '1002',
      customerName: 'Jane Smith',
      productName: 'Smartphone X',
      status: 'Shipped',
    },
    {
      id: '1003',
      customerName: 'Bob Johnson',
      productName: 'Wireless Earbuds',
      status: 'Delivered',
    },
  ];

  const [orders, setOrders] = useState(mockOrders); // Set initial mock data
  const [searchQuery, setSearchQuery] = useState(''); // State to track search input

  // Filtered orders based on search query (Order ID)
  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMarkAsDelivered = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: 'Delivered' } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div>
      <h2>Order Management</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by Order ID..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
      />

      {/* Orders Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.productName}</td>
                <td>{order.status}</td>
                <td>
                  {order.status !== 'Delivered' && (
                    <button onClick={() => handleMarkAsDelivered(order.id)}>
                      Mark as Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VenderOrderManagement;
