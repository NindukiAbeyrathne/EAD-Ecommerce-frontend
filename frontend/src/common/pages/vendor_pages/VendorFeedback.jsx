import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../../styles/vendor.css'; // Include your custom CSS file

const VendorFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const vendorId = useSelector((state) => state.auth.id); // Access vendorId from Redux state

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/vendor/${vendorId}/comments`); // Adjust the endpoint as needed
        const data = await response.json();
        console.log("API Response:", data); // Log the API response for debugging
        setFeedback(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    if (vendorId) {
      fetchFeedback(); // Fetch feedback only if vendorId is available
    }
  }, [vendorId]);

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>★</span>
      );
    }
    return stars;
  };

  return (
    <div className="vendor-feedback-page">
      <div className="vendor-feedback-card"><br/>
        <h2 className="text-center mb-4">Customer Feedback</h2>
        <div className="vendor-feedback-cards">
          {feedback.length > 0 ? (
            feedback.map((item) => (
              <div key={item.customerId} className="vendor-feedback-card-item"> {/* Adjusted class name for consistency */}
                <div className="card shadow-sm border-light">
                  <div className="card-body">
                    <h5 className="card-title">Customer Name: {item.customer.name || 'N/A'}</h5>
                    <div className="rating mb-2">Rating: {renderStars(item.rating)}</div> {/* Render stars */}
                    <p className="card-text">Feedback from Customer: {item.comment}</p>
                    <p className="card-text"><small className="text-muted">Email: {item.customer.email || 'N/A'}</small></p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <p className="lead">No feedback available for your products.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorFeedback;
