import React, { useState, useEffect } from "react";

const VendorOrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/orders/vendor/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const markAsDelivered = async (orderId, productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/vendor/deliver/${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark item as delivered");
      }

      const data = await response.json();
      alert(data.message);

      setOrders(
        orders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                items: order.items.map((item) =>
                  item.productId === productId
                    ? { ...item, deliveryStatus: "Delivered" }
                    : item
                ),
              }
            : order
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "40px", backgroundColor: "#f5f5f5" }}>
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            className="table table-striped table-bordered"
            style={{ width: "100%", marginBottom: "30px" }}
          >
            <thead
              style={{
                backgroundColor: "#343a40",
                color: "#fff",
                textAlign: "center",
              }}
            >
              <tr>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) =>
                order.items.map((item) => (
                  <tr key={item.productId} style={{ textAlign: "center" }}>
                    <td>{order.id}</td>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>{item.deliveryStatus || "Pending"}</td>
                    <td>
                      {item.deliveryStatus !== "Delivered" ? (
                        <button
                          style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            padding: "8px 12px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            markAsDelivered(order.id, item.productId)
                          }
                        >
                          Mark as Delivered
                        </button>
                      ) : (
                        <span
                          style={{
                            display: "inline-block",
                            backgroundColor: "#28a745",
                            color: "#fff",
                            padding: "5px 10px",
                            borderRadius: "5px",
                          }}
                        >
                          Delivered
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorOrderDashboard;
