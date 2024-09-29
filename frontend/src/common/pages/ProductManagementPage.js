import React, { useState } from "react";
import NavigationBar from "./nav_bar"; // Importing the NavigationBar component
import "../../styles/ProductManagementPage.css"; // Assuming the CSS file is in the same folder structure

const ProductManagementPage = () => {
  // Example state to track products
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", vendor: "Vendor 1", status: "Pending" },
    { id: 2, name: "Product B", vendor: "Vendor 2", status: "Approved" },
    { id: 3, name: "Product C", vendor: "Vendor 3", status: "Disapproved" },
  ]);

  const approveProduct = (productId) => {
    setProducts(
      products.map((product) =>
        product.id === productId ? { ...product, status: "Approved" } : product
      )
    );
  };

  const disapproveProduct = (productId) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, status: "Disapproved" }
          : product
      )
    );
  };

  const toggleActivation = (productId) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? {
              ...product,
              status: product.status === "Active" ? "Inactive" : "Active",
            }
          : product
      )
    );
  };

  return (
    <div className="product-management-page">
      {/* Navigation Bar is outside the product management card */}
      <NavigationBar />

      <div className="product-management-card">
        <h2>Product Management</h2>
        <p>
          View all products listed by Vendors. Approve or disapprove products
          submitted by Vendors. Activate or deactivate product listings across
          all categories.
        </p>

        <table className="product-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.vendor}</td>
                <td>{product.status}</td>
                <td>
                  {product.status === "Pending" && (
                    <>
                      <button onClick={() => approveProduct(product.id)}>
                        Approve
                      </button>
                      <button onClick={() => disapproveProduct(product.id)}>
                        Disapprove
                      </button>
                    </>
                  )}
                  <button onClick={() => toggleActivation(product.id)}>
                    {product.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagementPage;
