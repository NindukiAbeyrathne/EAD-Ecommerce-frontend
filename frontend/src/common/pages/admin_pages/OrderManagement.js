import React, { useState, useEffect } from "react";
import "../../../styles/csr.css"; // Ensure this path is correct
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Ensure this import is present

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [editOrderId, setEditOrderId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false); // New state for showing error messages
  const [orderToDelete, setOrderToDelete] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        const data = await response.json();
        console.log(data);
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setErrorMessage("Failed to fetch orders."); // Set error message
        setShowError(true);
        setTimeout(() => setShowError(false), 3000); // Auto-hide after 3 seconds
      }
    };

    fetchOrders();
  }, []);

  const saveEditOrder = async (order) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${order.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      let updatedOrder;
      if (response.status === 204) {
        updatedOrder = order;
      } else {
        updatedOrder = await response.json();
      }

      setOrders(
        orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
      );
      setEditOrderId(null);
      setSuccessMessage("Order status updated successfully!");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating order:", error);
      setErrorMessage("Failed to update order."); // Set error message
      setShowError(true);
      setTimeout(() => setShowError(false), 3000); // Auto-hide after 3 seconds
    }
  };

  const deleteOrder = async (id) => {
    const order = orders.find((o) => o.id === id);
    if (!order) {
      alert("Cannot cancel a non-existing order.");
      return;
    }

    if (order.status !== "Processing") {
      alert("You can only cancel orders with the status 'Processing'.");
      return;
    }

    setOrderToDelete(order);
    const modalElement = document.getElementById("confirmationModal");
    const bootstrapModal = new window.bootstrap.Modal(modalElement); // Ensure Modal is defined from Bootstrap's JS
    bootstrapModal.show();
  };

  const confirmDelete = async () => {
    if (!orderToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setOrders(orders.filter((order) => order.id !== orderToDelete.id));
        setSuccessMessage("Order cancelled successfully!");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        throw new Error("Failed to cancel order");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      setErrorMessage("Failed to cancel order."); // Set error message
      setShowError(true);
      setTimeout(() => setShowError(false), 3000); // Auto-hide after 3 seconds
    } finally {
      const modalElement = document.getElementById("confirmationModal");
      const bootstrapModal = window.bootstrap.Modal.getInstance(modalElement);
      bootstrapModal.hide(); // Hide the Bootstrap modal
      setOrderToDelete(null);
    }
  };

  return (
    <div className="container-fluid mt-5">


      {/* Success Message */}
      {showSuccess && (
        <div
          className="alert alert-success text-center mx-auto mb-4"
          role="alert"
          style={{ width: "50%" }}>
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {showError && (
        <div
          className="alert alert-danger text-center mx-auto mb-4"
          role="alert"
          style={{ width: "50%" }}>
          {errorMessage}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Products</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerId}</td>
                <td>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.productName} - {item.quantity} pcs
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${order.totalPrice}</td>
                <td>
                  {editOrderId === order.id ? (
                    <select
                      className="form-select"
                      value={order.status}
                      onChange={(e) =>
                        setOrders(
                          orders.map((o) =>
                            o.id === order.id
                              ? { ...o, status: e.target.value }
                              : o
                          )
                        )
                      }>
                      <option value="Processing">Processing</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Partially Delivered">Partially Delivered</option>
                    </select>
                  ) : (
                    order.status
                  )}
                </td>
                <td>
                  {editOrderId === order.id ? (
                    <div>
                      <button
                        className="btn btn-success mb-2"
                        onClick={() => saveEditOrder(order)}>
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setEditOrderId(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                    <button
                      className={`btn mb-2 ${order.status === "Cancelled" || order.status === "Cancellation Requested" ? "btn-secondary" : "btn-primary"}`}
                      onClick={() => setEditOrderId(order.id)}
                      disabled={order.status === "Cancelled" || order.status === "Cancellation Requested"}
                    >
                      Edit Status
                    </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bootstrap modal for confirmation */}
      <div
        className="modal fade"
        id="confirmationModal"
        tabIndex="-1"
        aria-labelledby="confirmationModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmationModalLabel">
                Cancel Order Confirmation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setOrderToDelete(null)}></button>
            </div>
            <div className="modal-body">
              Are you sure you want to cancel order ID: {orderToDelete?.id}?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setOrderToDelete(null)}>
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDelete}>
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
