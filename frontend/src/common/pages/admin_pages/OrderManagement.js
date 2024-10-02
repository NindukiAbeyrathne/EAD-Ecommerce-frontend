import React, { useState } from "react";
import NavigationBar from "./nav_bar"; // Import the NavigationBar component
import "../../../styles/order.css"; // Assuming the CSS file is in the same folder structure

const OrderPage = () => {
  // Example state to track orders
  const [orders, setOrders] = useState([
    { id: 1, customer: "John Doe", status: "Pending", canCancel: true },
    { id: 2, customer: "Jane Smith", status: "Shipped", canCancel: false },
  ]);

  const markAsDelivered = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "Delivered" } : order
      )
    );
  };

  const cancelOrder = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  return (
    <div className="order-page">
      {/* Navigation Bar is outside the order management card */}
      <NavigationBar />
      <br />
      <div className="order-management-card">
        <h2>Order Management</h2>
        <p>
          View and manage all customer orders. Track order statuses and mark
          them as delivered. Cancel orders upon customer request and notify the
          customer.
        </p>

        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.status}</td>
                <td>
                  {order.status !== "Delivered" && (
                    <button onClick={() => markAsDelivered(order.id)}>
                      Mark as Delivered
                    </button>
                  )}
                  {order.canCancel && (
                    <button onClick={() => cancelOrder(order.id)}>
                      Cancel Order
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
