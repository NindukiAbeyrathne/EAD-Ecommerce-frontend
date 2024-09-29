// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Table,
//   Alert,
//   Spinner,
// } from "react-bootstrap";

// const OrderManagement = () => {
//   const [orders, setOrders] = useState([]); // State for orders
//   const [newOrder, setNewOrder] = useState({ customer: "", product: "" }); // State for new order
//   const [loading, setLoading] = useState(false); // State for loading indication
//   const [error, setError] = useState(""); // State for error messages

//   // Fetch orders from backend when the component mounts
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // Fetch orders from backend API
//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("/api/orders"); // Replace with your API URL
//       setOrders(response.data);
//     } catch (err) {
//       setError("Error fetching orders.");
//     }
//     setLoading(false);
//   };

//   // Create a new order
//   const createOrder = async () => {
//     if (!newOrder.customer || !newOrder.product) {
//       alert("Please fill in both customer and product fields.");
//       return;
//     }

//     try {
//       const response = await axios.post("/api/orders", {
//         customer: newOrder.customer,
//         product: newOrder.product,
//         status: "Processing",
//       });
//       setOrders([...orders, response.data]); // Update state with the newly created order
//       setNewOrder({ customer: "", product: "" }); // Reset form fields
//     } catch (err) {
//       setError("Error creating order.");
//     }
//   };

//   // Update order status
//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       await axios.put(`/api/orders/${orderId}`, { status: newStatus });
//       setOrders(
//         orders.map((order) =>
//           order.id === orderId ? { ...order, status: newStatus } : order
//         )
//       );
//     } catch (err) {
//       setError("Error updating order status.");
//     }
//   };

//   // Cancel an order
//   const cancelOrder = async (orderId) => {
//     try {
//       await axios.delete(`/api/orders/${orderId}`);
//       setOrders(orders.filter((order) => order.id !== orderId)); // Remove order from state
//     } catch (err) {
//       setError("Error canceling the order.");
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <h1 className="text-center mb-4">Order Management</h1>

//       {/* Error Handling */}
//       {error && <Alert variant="danger">{error}</Alert>}

//       {/* Loading Indicator */}
//       {loading && <Spinner animation="border" className="mb-3" />}

//       {/* Form to Create New Order */}
//       <Row className="mb-5">
//         <Col md={6} className="mx-auto">
//           <h2>Create New Order</h2>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Customer Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter customer name"
//                 value={newOrder.customer}
//                 onChange={(e) =>
//                   setNewOrder({ ...newOrder, customer: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Product</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter product"
//                 value={newOrder.product}
//                 onChange={(e) =>
//                   setNewOrder({ ...newOrder, product: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Button variant="primary" onClick={createOrder} className="w-100">
//               Create Order
//             </Button>
//           </Form>
//         </Col>
//       </Row>

//       {/* List of Existing Orders */}
//       <h2 className="mb-4">Manage Existing Orders</h2>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Customer</th>
//             <th>Product</th>
//             <th>Status</th>
//             <th>Update Status</th>
//             <th>Cancel Order</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order.id}>
//               <td>{order.id}</td>
//               <td>{order.customer}</td>
//               <td>{order.product}</td>
//               <td>{order.status}</td>
//               <td>
//                 <Form.Select
//                   value={order.status}
//                   onChange={(e) => updateOrderStatus(order.id, e.target.value)}
//                   disabled={
//                     order.status === "Dispatched" ||
//                     order.status === "Delivered"
//                   }>
//                   <option value="Processing">Processing</option>
//                   <option value="Dispatched">Dispatched</option>
//                   <option value="Delivered">Delivered</option>
//                 </Form.Select>
//               </td>
//               <td>
//                 <Button
//                   variant="danger"
//                   onClick={() => cancelOrder(order.id)}
//                   disabled={order.status !== "Processing"}>
//                   Cancel Order
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default OrderManagement;
// src/components/admin/OrderManagement.jsx
import React from "react";
import NavigationBar from "./nav_bar";

const OrderManagement = () => {
  return (
    <div className="admin-page-container">
      <NavigationBar />
      <div className="admin-page-content">
        <h2>Order Management</h2>
        <p>View and manage customer orders here.</p>
        <ul>
          <li>View and manage all customer orders.</li>
          <li>Track order statuses and mark them as delivered.</li>
          <li>Cancel orders upon customer request and notify the customer.</li>
        </ul>
      </div>
    </div>
  );
};

export default OrderManagement;
