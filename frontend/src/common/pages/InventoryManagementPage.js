// src/pages/InventoryManagementPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryManagementPage = () => {
  const [inventory, setInventory] = useState([]);
  const [lowStockAlert, setLowStockAlert] = useState(null);

  useEffect(() => {
    // Fetch inventory data when the component loads
    const fetchInventory = async () => {
      const response = await axios.get('http://localhost:5000/api/inventory');
      setInventory(response.data);

      // Check for low stock products
      const lowStockItems = response.data.filter(item => item.stock < 10);  // Assuming 10 is the threshold
      if (lowStockItems.length > 0) {
        setLowStockAlert(`Low stock alert: ${lowStockItems.map(item => item.name).join(', ')}`);
        // Notify vendor about the low stock
        await axios.post('http://localhost:5000/api/notify', { message: `Low stock alert: ${lowStockItems.map(item => item.name).join(', ')}` });
      }
    };

    fetchInventory();
  }, []);

  const handleRemoveStock = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/inventory/${productId}`);
      setInventory(inventory.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Cannot remove stock for products with pending orders', error);
    }
  };

  return (
    <div className="inventory-management-page">
      <h2>Inventory Management</h2>

      {lowStockAlert && <div className="alert alert-warning">{lowStockAlert}</div>}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Available Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleRemoveStock(item.id)} 
                  disabled={item.pendingOrder}
                >
                  Remove Stock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagementPage;
