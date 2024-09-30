// src/components/csr/ManageOrders.jsx
import React, { useState, useEffect } from 'react';
import "../../../styles/csr.css"

// Mock order data for demonstration purposes
const mockOrderData = [
  { id: 1, customer: "John Doe", product: "Laptop", status: "Delivered", notification: "Order Delivered" },
  { id: 2, customer: "Jane Smith", product: "Smartphone", status: "Pending", notification: "No Notification" },
  { id: 3, customer: "Mike Johnson", product: "Headphones", status: "Cancelled", notification: "Order Cancelled" },
];

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [cancellationReason, setCancellationReason] = useState('');

  useEffect(() => {
    // Normally, you would fetch the orders from an API
    // setOrders(dataFromAPI);
    setOrders(mockOrderData); // Using mock data for now
  }, []);

  const cancelOrder = (id) => {
    const reason = prompt("Please provide a reason for cancellation:");
    if (reason) {
      setOrders(orders.map(order => 
        order.id === id ? { ...order, status: 'Cancelled', notification: `Order Cancelled: ${reason}` } : order
      ));
    }
  };

  const notifyCustomer = (id, message) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, notification: message } : order
    ));
  };

  const markAsDelivered = (id) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'Delivered', notification: 'Order Delivered' } : order
    ));
  };

  return (
    <div className="manage-orders-container">
      <h2>Manage Orders</h2>
      <p>View, cancel customer orders upon request, and notify customers of cancellations or deliveries.</p>

      <table className="order-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Status</th>
            <th>Notification</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.status}</td>
              <td>{order.notification}</td>
              <td>
                {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                  <>
                    <button onClick={() => cancelOrder(order.id)}>Cancel Order</button>
                    <button onClick={() => markAsDelivered(order.id)}>Mark as Delivered</button>
                  </>
                )}
                {order.status === 'Delivered' && (
                  <button onClick={() => notifyCustomer(order.id, 'Thank you for your order!')}>Send Thank You</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;