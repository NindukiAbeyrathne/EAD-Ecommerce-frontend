import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/ProductManagementPage.css"; // Assuming you have your CSS styles here

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noProducts, setNoProducts] = useState(false); // New state for no products case

  const navigate = useNavigate();

  // Fetch products and vendor stocks from the backend
  useEffect(() => {
    const fetchProductsAndStocks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        // Fetch Products
        const productsResponse = await fetch("http://localhost:5000/api/products/vendor", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!productsResponse.ok) {
          const message = await productsResponse.json();
          
          // Handle the "No products found" case separately
          if (message.message === "No products found for this vendor.") {
            setNoProducts(true); // Set noProducts to true if there are no products
            setLoading(false);
            return;
          }

          throw new Error(`Failed to fetch products: ${JSON.stringify(message)}`);
        }

        const productsData = await productsResponse.json();

        // Fetch Vendor Stocks
        const stocksResponse = await fetch("http://localhost:5000/api/inventory/vendor/stocks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!stocksResponse.ok) {
          const message = await stocksResponse.text();
          throw new Error(`Failed to fetch vendor stocks: ${message}`);
        }
        const stocksData = await stocksResponse.json();

        // Merge product and stock data
        const mergedData = productsData.map((product) => {
          const stock = stocksData.vendorStocks.find((s) => s.productId === product.id) || {
            availableQuantity: 0,
            reservedQuantity: 0,
            notifications: [],
          };
          return {
            ...product,
            availableQuantity: stock.availableQuantity,
            reservedQuantity: stock.reservedQuantity,
            notifications: stock.notifications,
          };
        });

        setProducts(mergedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndStocks();
  }, []);

  const toggleActivation = async (productId) => {
    const product = products.find((p) => p.id === productId);
    const newStatus = !product.isActive;

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}/${newStatus ? "activate" : "deactivate"}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        const message = await response.text();
        throw new Error(`Failed to toggle activation: ${message}`);
      }
      setProducts(
        products.map((product) =>
          product.id === productId ? { ...product, isActive: newStatus } : product
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddProductClick = () => {
    navigate("/add-product");
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(`Failed to delete product: ${message}`);
      }

      // Remove the deleted product from the state
      setProducts(products.filter((product) => product.id !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-management-page">
      <div className="product-management-card" >

      <div className="header-with-button">
          <button
            className="btn btn-primary"
            onClick={handleAddProductClick}
            style={{ marginBottom: '20px' }}
          >
            Add Product
          </button>
        </div>

        <div>
          {noProducts ? (
            <div className="no-products-message">
            <p style={{ width: '90vw',  color: '#ffffff'}}>No products available.</p>
            </div>

          ) : (
            <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Available Quantity</th>
                  <th>Reserved Quantity</th>
                  <th>Status</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/100";
                        }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>{product.availableQuantity}</td>
                    <td>{product.reservedQuantity}</td>
                    <td>{product.isActive ? "Active" : "Inactive"}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => handleEditProduct(product.id)}
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteProduct(product.id)}
                        style={{ marginRight: "10px" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagementPage;
