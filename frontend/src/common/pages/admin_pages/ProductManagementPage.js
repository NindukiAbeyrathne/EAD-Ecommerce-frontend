import React, { useState, useEffect } from "react";

import "../../../styles/ProductManagementPage.css"; // Assuming the CSS file is in the same folder structure

const ProductManagementPage = () => {
  // State to track products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        // Map the data to extract only the required fields
        const filteredProducts = data.map((product) => ({
          id: product.id,
          image: product.imageUrl,
          name: product.name,
          category: product.category,
          vendorId: product.vendorId,
          price: product.price,
          isActive: product.isActive,
        }));
        setProducts(filteredProducts); // Set the filtered products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleActivation = async (productId) => {
    const product = products.find((p) => p.id === productId);
    const newStatus = !product.isActive;

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}/${
          newStatus ? "activate" : "deactivate"
        }`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to toggle activation");
      }
      setProducts(
        products.map((product) =>
          product.id === productId
            ? { ...product, isActive: newStatus }
            : product
        )
      );
    } catch (err) {
      setError(err.message);
    }
    console.log(
      `Requesting URL: http://localhost:5000/api/products/${productId}/${
        newStatus ? "activate" : "deactivate"
      }`
    );
  };

  const handleOperationsClick = (product) => {
    product.showDetails = !product.showDetails; // Toggle visibility of product details
    setProducts([...products]); // Update state to trigger re-render
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-management-page">
     

      <div className="product-management-card">
        <h2>Product Management</h2><br/>
        

        <div className="product-cards">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null; // Prevent looping
                  e.target.src = "https://via.placeholder.com/100"; // Fallback image
                }}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Vendor ID: {product.vendorId}</p>
              <p>Price: ${product.price}</p>
              <p>Status: {product.isActive ? "Active" : "Inactive"}</p>
              <button className="btn-operations" onClick={() => handleOperationsClick(product)}>
                Operations
              </button>

              {product.showDetails && ( // Show details below the card if clicked
                <div className="product-details">
                  <h3>Product Details</h3>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    style={{ marginBottom: "10px" }}
                  />
                  <p><strong>Name:</strong> {product.name}</p>
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Vendor ID:</strong> {product.vendorId}</p>
                  <p><strong>Price:</strong> ${product.price}</p>
                  <p><strong>Status:</strong> {product.isActive ? "Active" : "Inactive"}</p>
                  <button
                    onClick={() => toggleActivation(product.id)}
                    className={`btn-detail-activation ${product.isActive ? "active" : "inactive"}`}
                  >
                    {product.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button onClick={() => handleOperationsClick(product)} className="btn-operations" style={{ marginTop: "10px" }}>
                    Close
                  </button> {/* Button to close the details */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManagementPage;
