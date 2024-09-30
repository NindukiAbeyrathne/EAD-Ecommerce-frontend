// src/components/csr/TrackDeliveries.jsx
import React, { useState, useEffect } from 'react';
import "../../../styles/csr.css"
// Mock data for orders and delivery statuses (replace with real API data)
const mockOrders = [
  { orderId: 1, customer: 'John Doe', status: 'Partially Delivered', vendor: 'Vendor A', itemsDelivered: 2, totalItems: 4 },
  { orderId: 2, customer: 'Jane Smith', status: 'Pending', vendor: 'Vendor B', itemsDelivered: 0, totalItems: 3 },
  { orderId: 3, customer: 'Alice Brown', status: 'Delivered', vendor: 'Vendor C', itemsDelivered: 2, totalItems: 2 },
];

const TrackDeliveries = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // In a real application, fetch order data from an API
    setOrders(mockOrders);
  }, []);

  const markAsDelivered = (orderId) => {
    // Handle marking order as delivered
    const updatedOrders = orders.map(order =>
      order.orderId === orderId ? { ...order, status: 'Delivered', itemsDelivered: order.totalItems } : order
    );
    setOrders(updatedOrders);
    alert(`Order ${orderId} has been marked as Delivered!`);
    // Notify customer with an API call
  };

  const handlePartialDelivery = (orderId) => {
    // Handle marking partial delivery
    const updatedOrders = orders.map(order =>
      order.orderId === orderId && order.itemsDelivered < order.totalItems
        ? { ...order, status: 'Partially Delivered', itemsDelivered: order.itemsDelivered + 1 }
        : order
    );
    setOrders(updatedOrders);
    alert(`One item from order ${orderId} has been marked as Partially Delivered.`);
    // Notify customer with an API call
  };

  return (
    <div className="track-deliveries-container">
      <h2>Track Deliveries</h2>
      <p>Track customer orders, manage partial deliveries, and notify customers.</p>

      <div className="orders-list">
        {orders.map(order => (
          <div key={order.orderId} className="order-card">
            <h3>Order ID: {order.orderId}</h3>
            <p>Customer: {order.customer}</p>
            <p>Vendor: {order.vendor}</p>
            <p>Status: {order.status}</p>
            <p>Items Delivered: {order.itemsDelivered} / {order.totalItems}</p>

            {order.status !== 'Delivered' && (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => markAsDelivered(order.orderId)}
                >
                  Mark as Delivered
                </button>
                {order.itemsDelivered < order.totalItems && (
                  <button
                    className="btn btn-secondary"
                    onClick={() => handlePartialDelivery(order.orderId)}
                  >
                    Mark Partial Delivery
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackDeliveries;