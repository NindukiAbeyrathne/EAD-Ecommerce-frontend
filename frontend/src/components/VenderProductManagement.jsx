import React, { useState, useEffect } from 'react';

function VenderProductManagement() {
  // Mock products for initial data
  const mockProducts = [
    {
      id: 1,
      name: 'Laptop Pro',
      description: 'A high-end laptop for professionals',
      price: 1500,
      quantity: 20,
      category: 'Electronics',
      image: 'https://via.placeholder.com/150', // Placeholder image
      isActive: true,
    },
    {
      id: 2,
      name: 'Smartphone X',
      description: 'A sleek smartphone with advanced features',
      price: 999,
      quantity: 50,
      category: 'Mobiles',
      image: 'https://via.placeholder.com/150', // Placeholder image
      isActive: true,
    },
    {
      id: 3,
      name: 'Wireless Earbuds',
      description: 'High-quality sound with noise cancellation',
      price: 199,
      quantity: 100,
      category: 'Accessories',
      image: 'https://via.placeholder.com/150', // Placeholder image
      isActive: false,
    },
  ];

  // State for product list
  const [products, setProducts] = useState(mockProducts);

  // State for new product creation
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
    image: null, // File upload
    isActive: true,
  });

  // Mock API call (in reality, you'd use axios to fetch from the server)
  useEffect(() => {
    // If you'd fetch from server, you'd use:
    // fetchProducts();
    console.log("Loaded initial mock data");
  }, []);

  // Function to handle the creation of a new product
  const handleCreateProduct = () => {
    const newProductEntry = {
      ...newProduct,
      id: products.length + 1, // Assign a new id based on the length of the product array
      image: newProduct.image ? URL.createObjectURL(newProduct.image) : 'https://via.placeholder.com/150', // Mock image
    };
    setProducts([...products, newProductEntry]);
  };

  // Handle delete product action
  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  // Handle activate/deactivate product action
  const handleActivateProduct = (productId, isActive) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, isActive: isActive } : product
    );
    setProducts(updatedProducts);
  };

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle file upload for the product image
  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  return (
    <div>
      <h2>Product Management</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleInputChange}
        />
        <input type="file" name="image" onChange={handleImageChange} />
        <label>
          <input
            type="checkbox"
            name="isActive"
            checked={newProduct.isActive}
            onChange={(e) => setNewProduct({ ...newProduct, isActive: e.target.checked })}
          />
          Active
        </label>
        <button onClick={handleCreateProduct}>Create Product</button>
      </div>

      <h3>Product List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Image</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>
                {product.image ? (
                  <img src={product.image} alt={product.name} width="50" />
                ) : (
                  'No image'
                )}
              </td>
              <td>{product.isActive ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleActivateProduct(product.id, !product.isActive)}>
                  {product.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VenderProductManagement;
