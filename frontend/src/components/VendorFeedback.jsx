import React, { useState, useEffect } from 'react';

function VendorFeedback() {
  // Mock data for feedback
  const mockFeedbacks = [
    {
      id: 1,
      customerName: 'John Doe',
      rating: 5,
      comment: 'Great service and fast delivery!',
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      rating: 4,
      comment: 'Good product quality, but shipping was a bit slow.',
    },
    {
      id: 3,
      customerName: 'Bob Johnson',
      rating: 3,
      comment: 'Average experience, product arrived with slight damage.',
    },
  ];

  const [feedbacks, setFeedbacks] = useState(mockFeedbacks); // Set initial mock data

  // Handle the fetching of feedback data (simulated here with mock data)
  useEffect(() => {
    // In a real-world scenario, you'd call an API to fetch feedback data:
    // fetchFeedback();
    console.log("Loaded initial mock feedback data");
  }, []);

  return (
    <div>
      <h2>Vendor Feedback</h2>

      {/* Feedback Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Rating</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.customerName}</td>
              <td>{feedback.rating}</td>
              <td>{feedback.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VendorFeedback;
