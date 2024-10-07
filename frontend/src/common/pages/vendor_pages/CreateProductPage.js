import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/createProduct.css";

const CreateProductPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState(""); // Add description state
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const newProduct = {
      name,
      price,
      stock,
      category,
      imageUrl,
      description, // Include description in the product data
    };

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to create the product");
      }

      setError(null);
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/product-management");
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create New Product</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
            />
          </div>

          <div className="form-group">
            <label>Stock Quantity</label>
            <input
              type="number"
              placeholder="Enter stock quantity"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value))}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>

          

          <button type="submit" className="submit-button">
            Create Product
          </button>
        </form>

        {showSuccessModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Product Created</h3>
              <p>Your product has been created successfully!</p>
              <button className="modal-button" onClick={handleModalClose}>
                Go to Product Management
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProductPage;
