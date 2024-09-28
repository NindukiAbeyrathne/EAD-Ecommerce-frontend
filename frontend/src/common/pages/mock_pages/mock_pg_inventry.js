// src/pages/InventoryManagementPage.js
import React, { useState, useEffect } from 'react';

const InventoryManagementPage = () => {
  const [inventory, setInventory] = useState([]);
  const [lowStockAlert, setLowStockAlert] = useState(null);

  useEffect(() => {
    // Mock inventory data
    const mockInventory = [
      { id: 1, name: 'Product A', stock: 5, pendingOrder: false },
      { id: 2, name: 'Product B', stock: 50, pendingOrder: true },
      { id: 3, name: 'Product C', stock: 8, pendingOrder: false },
      { id: 4, name: 'Product D', stock: 0, pendingOrder: false },
    ];
    setInventory(mockInventory);

    // Simulate low stock alert
    const lowStockItems = mockInventory.filter(item => item.stock < 10);
    if (lowStockItems.length > 0) {
      setLowStockAlert(`Low stock alert: ${lowStockItems.map(item => item.name).join(', ')}`);
    }
  }, []);

  const handleRemoveStock = (productId) => {
    setInventory(inventory.filter(item => item.id !== productId));
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
