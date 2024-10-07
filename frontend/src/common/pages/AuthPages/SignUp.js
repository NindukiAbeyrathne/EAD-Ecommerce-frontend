import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/images/logo.jpg";
import cartimg from "../../assets/images/cart.webp";
import axios from "axios"; // Import axios to handle the API request

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState(""); // Add state for name
  const [Pnumber, setPnumber] = useState(""); // Add state for phone number
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const newUser = {
      email,
      passwordHash: password, // Ensure the password field matches your backend expectations
      role,
      isActive: true, // Assuming users are active upon signup
      name, // Include the name in the new user object
      Pnumber, // Include the phone number in the new user object
    };

    try {
      // Send the signup data directly using axios
      await axios.post("http://localhost:5000/api/auth/signup", newUser);
      setMessage("Signup successful! Please login.");
      navigate("/UserForm"); // Redirect to login page after successful signup
    } catch (error) {
      setMessage("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-between align-items-center vh-100 p-0">
      <div className="w-100" style={{ backgroundColor: "#0f3460", height: "40px" }}></div>
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="card d-flex flex-row" style={{ width: "900px", backgroundColor: "#FAF9F6" }}>
          <div className="col-md-6 p-4">
            <div className="text-center mb-4">
              <img src={logo} alt="Company Logo" className="mb-3" style={{ width: "150px" }} />
              <h2 className="form-heading">Create Your Account</h2>
            </div>
            <form onSubmit={handleSignUp}>
              <div className="form-group mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter your phone number"
                  value={Pnumber}
                  onChange={(e) => setPnumber(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Role</label>
                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ height: "40px" }}
                  required
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="Administrator">Administrator</option>
                  <option value="Vendor">Vendor</option>
                  <option value="CSR">CSR</option>
                </select>
              </div>
              <button className="btn btn-primary w-100" type="submit">
                Sign Up
              </button>
            </form>

            {message && <p className="alert alert-info mt-3">{message}</p>}

            <div className="text-center mt-3">
              <p>
                Already have an account? <Link to="/UserForm">Login</Link>
              </p>
            </div>
          </div>
          <div
            className="col-md-6 d-flex flex-column justify-content-center align-items-start p-4"
            style={{ backgroundColor: "#0f3460", color: "white" }}
          >
            <h3
              style={{
                color: "white",
                fontFamily: "-moz-initial",
                textAlign: "center",
              }}
            >
              JOIN THE COMMUNITY
            </h3>
            <br />
            <img
              src={cartimg}
              alt="Company Logo"
              className="mb-3"
              style={{ width: "410px", height: "450px" }}
            />
            <br />
            <p style={{ color: "white", fontSize: "100%" }}>
              Enjoy exclusive deals and promotions tailored just for you. Create
              your account and become part of our vibrant shopping community
              today!
            </p>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#0f3460", height: "50px" }}></div>
    </div>
  );
};

export default SignUpForm;
