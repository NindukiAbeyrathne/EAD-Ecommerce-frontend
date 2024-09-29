// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../styles/ProductManagementPage.css";

// const ProductManagementPage = () => {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     category: "",
//     price: "",
//     isActive: true,
//   });
//   const [editingProduct, setEditingProduct] = useState(null);

//   // Fetch products from the backend
//   useEffect(() => {
//     axios
//       .get("/api/products") // Replace with your API endpoint
//       .then((response) => setProducts(response.data))
//       .catch((error) => console.log("Error fetching products", error));
//   }, []);

//   // Create a new product
//   const handleCreateProduct = () => {
//     axios
//       .post("/api/products", newProduct) // Replace with your API endpoint
//       .then((response) => {
//         setProducts([...products, response.data]);
//         setNewProduct({ name: "", category: "", price: "", isActive: true });
//       })
//       .catch((error) => console.log("Error creating product", error));
//   };

//   // Update an existing product
//   const handleUpdateProduct = (id) => {
//     axios
//       .put(`/api/products/${id}`, editingProduct) // Replace with your API endpoint
//       .then((response) => {
//         const updatedProducts = products.map((product) =>
//           product.id === id ? response.data : product
//         );
//         setProducts(updatedProducts);
//         setEditingProduct(null);
//       })
//       .catch((error) => console.log("Error updating product", error));
//   };

//   // Delete a product
//   const handleDeleteProduct = (id) => {
//     axios
//       .delete(`/api/products/${id}`) // Replace with your API endpoint
//       .then(() => {
//         const updatedProducts = products.filter((product) => product.id !== id);
//         setProducts(updatedProducts);
//       })
//       .catch((error) => console.log("Error deleting product", error));
//   };

//   // Toggle product activation
//   const handleToggleActivation = (id, isActive) => {
//     axios
//       .patch(`/api/products/${id}`, { isActive: !isActive }) // Replace with your API endpoint
//       .then((response) => {
//         const updatedProducts = products.map((product) =>
//           product.id === id ? { ...product, isActive: !isActive } : product
//         );
//         setProducts(updatedProducts);
//       })
//       .catch((error) =>
//         console.log("Error toggling product activation", error)
//       );
//   };

//   return (
//     <div className="container product-management-container">
//       <div className="product-header">
//         <h2>Product Management</h2>
//       </div>

//       {/* Create New Product Form */}
//       <div className="product-form">
//         <h3>Create New Product</h3>
//         <div className="form-group">
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="Product Name"
//             value={newProduct.name}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, name: e.target.value })
//             }
//           />
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="Category"
//             value={newProduct.category}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, category: e.target.value })
//             }
//           />
//           <input
//             type="number"
//             className="form-control mb-2"
//             placeholder="Price"
//             value={newProduct.price}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, price: e.target.value })
//             }
//           />
//           <button className="btn btn-success" onClick={handleCreateProduct}>
//             Create Product
//           </button>
//         </div>
//       </div>

//       {/* List of Products */}
//       <h3>Existing Products</h3>
//       <ul className="list-group product-list">
//         {products.map((product) => (
//           <li className="list-group-item" key={product.id}>
//             {editingProduct && editingProduct.id === product.id ? (
//               <div className="form-group">
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   value={editingProduct.name}
//                   onChange={(e) =>
//                     setEditingProduct({
//                       ...editingProduct,
//                       name: e.target.value,
//                     })
//                   }
//                 />
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   value={editingProduct.category}
//                   onChange={(e) =>
//                     setEditingProduct({
//                       ...editingProduct,
//                       category: e.target.value,
//                     })
//                   }
//                 />
//                 <input
//                   type="number"
//                   className="form-control mb-2"
//                   value={editingProduct.price}
//                   onChange={(e) =>
//                     setEditingProduct({
//                       ...editingProduct,
//                       price: e.target.value,
//                     })
//                   }
//                 />
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => handleUpdateProduct(product.id)}>
//                   Save
//                 </button>
//               </div>
//             ) : (
//               <div className="product-actions">
//                 <div>
//                   <strong>{product.name}</strong> - {product.category} - $
//                   {product.price}
//                 </div>
//                 <div>
//                   <button
//                     className="btn btn-info"
//                     onClick={() => setEditingProduct(product)}>
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => handleDeleteProduct(product.id)}>
//                     Delete
//                   </button>
//                   <button
//                     className="btn btn-warning"
//                     onClick={() =>
//                       handleToggleActivation(product.id, product.isActive)
//                     }>
//                     {product.isActive ? "Deactivate" : "Activate"}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductManagementPage;

// src/components/admin/ProductManagement.jsx
import React from "react";
import NavigationBar from "./nav_bar";

const ProductManagement = () => {
  return (
    <div className="admin-page-container">
      <NavigationBar />
      <div className="admin-page-content">
        <h2>Product Management</h2>
        <p>View and manage all vendor-listed products here.</p>
        <ul>
          <li>View all products listed by vendors.</li>
          <li>Approve or disapprove products submitted by vendors.</li>
          <li>Activate or deactivate product listings across categories.</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductManagement;
