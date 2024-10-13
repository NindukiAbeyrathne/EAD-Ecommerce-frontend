import React, { useState, useEffect } from "react";
import "../../../styles/csr.css"; // Ensure this path is correct
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Ensure this import is present

const CancellationRequests = () => {
  const [cancellationRequests, setCancellationRequests] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For error messages
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false); // For error messages

  useEffect(() => {
    const fetchCancellationRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders/cancellation-requests");
        const data = await response.json();
        setCancellationRequests(data.cancellationRequests || []);
      } catch (error) {
        console.error("Error fetching cancellation requests:", error);
        setErrorMessage("Failed to fetch cancellation requests."); // Set error message
        setShowError(true);
        setTimeout(() => setShowError(false), 3000); // Auto-hide after 3 seconds
      }
    };

    fetchCancellationRequests();
  }, []);

  const processCancellationRequest = async (id, action) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${id}/cancel-process`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(result.message);
        setShowSuccess(true);
        setCancellationRequests(cancellationRequests.filter(request => request.id !== id));
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        throw new Error(result.message || "Failed to process cancellation request.");
      }
    } catch (error) {
      console.error("Error processing cancellation request:", error);
      setErrorMessage("Failed to process cancellation request."); // Set error message
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
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
        {cancellationRequests.length > 0 ? (
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Total Price</th>
                <th>Requested On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cancellationRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.customerId}</td>
                  <td>${request.totalPrice}</td>
                  <td>{new Date(request.requestedOn).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-success mb-2"
                      onClick={() => processCancellationRequest(request.id, "Approve")}>
                      Approve
                    </button>
                    <button
                      className="btn btn-danger mb-2"
                      onClick={() => processCancellationRequest(request.id, "Reject")}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
            <div
                className="alert alert-info text-center"
                style={{ backgroundColor: "#f8d7da", color: "#721c24",border: "none"  }}>
                No cancellation requests available.
            </div>
        )}
      </div>
    </div>
  );
};

export default CancellationRequests;
