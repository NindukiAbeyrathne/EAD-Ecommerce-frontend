import React, { useState, useEffect } from "react";
import "../../../styles/adminProduct.css"; // Assuming the CSS file is in the same folder structure

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-management-page">

      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Vendor ID</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent looping
                    e.target.src = "https://via.placeholder.com/50"; // Fallback image
                  }}
                  className="product-table-image"
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.vendorId}</td>
              <td>${product.price}</td>
              <td>{product.isActive ? "Active" : "Inactive"}</td>
              <td>
                <button
                  onClick={() => toggleActivation(product.id)}
                  className={`btn-activation ${product.isActive ? "deactivate" : "activate"}`}
                >
                  {product.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagementPage;
