import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "../../../styles/Notification.css";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the vendor ID from Redux store
  const vendorId = useSelector((state) => state.auth.id);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/inventory/notifications/${vendorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        setNotifications(data.notifications || []); // Safely handle empty notifications
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [vendorId]);

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="notification-page">
      <h2 className="page-title">Vendor Notifications</h2>
      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications available.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((notification, index) => (
            <li key={index} className="notification-item">
              <div className="notification-icon">
                <i className="fas fa-bell"></i>
              </div>
              <div className="notification-content">
                <p>{notification}</p>
              </div>
              <div className="notification-time">
                <span>Just now</span> {/* Example: Add dynamic time data later */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;
