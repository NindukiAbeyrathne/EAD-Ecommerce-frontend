// src/components/csr/ViewVendorsProducts.jsx
import React, { useState, useEffect } from 'react';
import"../../../styles/csr.css"

// Mock data for vendors and products (replace with API data in real implementation)
const mockVendors = [
  { id: 1, name: 'Vendor A', contact: 'vendorA@example.com', products: ['Product 1', 'Product 2'] },
  { id: 2, name: 'Vendor B', contact: 'vendorB@example.com', products: ['Product 3', 'Product 4'] },
  { id: 3, name: 'Vendor C', contact: 'vendorC@example.com', products: ['Product 5', 'Product 6'] }
];

const ViewVendorsProducts = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    // In a real application, fetch vendor and product data from an API
    setVendors(mockVendors);
  }, []);

  return (
    <div className="view-vendors-products-container">
      <h2>View Vendors & Products</h2>
      <p>Assist customers with vendor and product issues. View vendor information and product listings.</p>

      <div className="vendor-list">
        {vendors.map(vendor => (
          <div key={vendor.id} className="vendor-card">
            <h3>{vendor.name}</h3>
            <p>Contact: {vendor.contact}</p>
            <h4>Products:</h4>
            <ul>
              {vendor.products.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewVendorsProducts;