import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../styles/ProfilePage.css"; 

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({
    email: "",
    name: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // To show success messages
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUserProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userProfile),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeactivateAccount = async () => {
    const confirmDeactivation = window.confirm("Are you sure you want to deactivate your account?");
    if (!confirmDeactivation) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/auth/users/${userId}/deactivate`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to deactivate account");
      }

      // Clear user session and redirect to login or homepage
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="profile-page">
      <h2 className="profile-title">User Profile</h2>

      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      <form className="profile-form" onSubmit={handleUpdateProfile}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userProfile.email}
            onChange={handleInputChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userProfile.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={userProfile.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn-update">Update Profile</button>
      </form>

      <button className="btn-deactivate" onClick={handleDeactivateAccount}>
        Deactivate Account
      </button>
    </div>
  );
};

export default ProfilePage;
