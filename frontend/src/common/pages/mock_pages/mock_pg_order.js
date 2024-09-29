import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import "../../../styles/OrderManagement.css";
const OrderManagement = () => {
  // Sample order data (you can replace this with data fetched from an API)
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    product: "",
    status: "Processing",
  });

  // Simulating fetching existing orders from API
  useEffect(() => {
    const fetchedOrders = [
      { id: 1, customer: "John Doe", product: "Laptop", status: "Processing" },
      {
        id: 2,
        customer: "Jane Smith",
        product: "Mobile Phone",
        status: "Dispatched",
      },
    ];
    setOrders(fetchedOrders);
  }, []);

  // Function to create a new order
  const createOrder = () => {
    const newOrderEntry = { ...newOrder, id: orders.length + 1 };
    setOrders([...orders, newOrderEntry]);
    setNewOrder({ customer: "", product: "", status: "Processing" });
  };

  // Function to update an order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Function to cancel an order
  const cancelOrder = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Order Management</h1>

      {/* Form to create new order */}
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter customer name"
                value={newOrder.customer}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, customer: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product"
                value={newOrder.product}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, product: e.target.value })
                }
              />
            </Form.Group>
            <Button variant="primary" onClick={createOrder}>
              Create Order
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Display existing orders */}
      <h2 className="mb-4">Manage Existing Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Status</th>
            <th>Update Status</th>
            <th>Cancel Order</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.status}</td>
              <td>
                <Form.Select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  disabled={
                    order.status === "Dispatched" ||
                    order.status === "Delivered"
                  }>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                </Form.Select>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => cancelOrder(order.id)}
                  disabled={order.status !== "Processing"}>
                  Cancel Order
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrderManagement;
