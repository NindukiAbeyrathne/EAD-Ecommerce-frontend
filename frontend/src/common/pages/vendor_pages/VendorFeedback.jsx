import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../../styles/vendor.css'; 

const VendorFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [averageRating, setAverageRating] = useState(null); // New state to store the average rating
  const vendorId = useSelector((state) => state.auth.id); // Access vendorId from Redux state

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the JWT token

        const response = await fetch(`http://localhost:5000/api/vendor/${vendorId}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        });

        const data = await response.json();
        setFeedback(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    const fetchAverageRating = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the JWT token

        const response = await fetch(`http://localhost:5000/api/vendor/${vendorId}/rating`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        });

        const data = await response.json();
        console.log(data.averageRating)
        setAverageRating(data.averageRating); // Store the average rating in state
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    };

    if (vendorId) {
      fetchFeedback(); 
      fetchAverageRating(); // Fetch average rating
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
        
        {/* Display the average rating */}
        <div className="average-rating">
          <h3>Average Rating: {averageRating ? renderStars(averageRating) : 'N/A'}</h3>
        </div>

        <div className="vendor-feedback-cards">
          {feedback.length > 0 ? (
            feedback.map((item) => (
              <div key={item.customerId} className="vendor-feedback-card-item"> 
                <div className="card shadow-sm border-light">
                  <div className="card-body">
                    <div className="feedback-line">
                      <strong>Customer Name:</strong> {item.customer.name || 'N/A'}
                    </div>
                    <div className="feedback-line">
                      <strong>Rating:</strong> {renderStars(item.rating)}
                    </div>
                    <div className="feedback-line">
                      <strong>Feedback:</strong> {item.comment}
                    </div>
                    <div className="feedback-line">
                      <strong>Email:</strong> {item.customer.email || 'N/A'}
                    </div>
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
