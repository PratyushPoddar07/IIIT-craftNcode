import React, { useState } from 'react';
import { Edit, Trash2, MoreVertical } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  status: string;
  expiryDate: string;
}

const InventoryTable = () => {
  const [inventory, setInventory] = useState<Product[]>([
    { id: 1, name: 'Surgical Masks', sku: 'SM-001', category: 'PPE', stock: 1000, price: 19.99, status: 'In Stock', expiryDate: '2025-12-31' },
    { id: 2, name: 'Digital Thermometer', sku: 'DT-002', category: 'Devices', stock: 12, price: 49.99, status: 'Low Stock', expiryDate: '2026-06-30' },
    { id: 3, name: 'Nitrile Gloves', sku: 'NG-003', category: 'PPE', stock: 500, price: 29.99, status: 'In Stock', expiryDate: '2025-08-15' },
    { id: 4, name: 'Stethoscope', sku: 'ST-004', category: 'Devices', stock: 0, price: 149.99, status: 'Out of Stock', expiryDate: '2030-12-31' },
    { id: 5, name: 'First Aid Kit', sku: 'FA-005', category: 'Emergency', stock: 23, price: 79.99, status: 'In Stock', expiryDate: '2024-12-31' },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showActions, setShowActions] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setInventory(inventory.filter(item => item.id !== id));
      alert('Product deleted successfully!');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setShowEditModal(true);
  };

  const handleUpdateStock = (product: Product) => {
    const newStock = prompt('Enter new stock quantity:', product.stock.toString());
    if (newStock !== null) {
      const quantity = parseInt(newStock, 10);
      if (!isNaN(quantity) && quantity >= 0) {
        setInventory(inventory.map(item => {
          if (item.id === product.id) {
            const status = quantity === 0 ? 'Out of Stock' : quantity < 15 ? 'Low Stock' : 'In Stock';
            return { ...item, stock: quantity, status };
          }
          return item;
        }));
        alert('Stock updated successfully!');
      } else {
        alert('Please enter a valid number!');
      }
    }
  };

  const handleViewDetails = (product: Product) => {
    const details = `
      Product Details:
      Name: ${product.name}
      SKU: ${product.sku}
      Category: ${product.category}
      Stock: ${product.stock}
      Price: $${product.price}
      Status: ${product.status}
      Expiry Date: ${product.expiryDate}
    `;
    alert(details);
  };

  const handleSaveEdit = () => {
    if (editingProduct) {
      setInventory(inventory.map(item => 
        item.id === editingProduct.id ? editingProduct : item
      ));
      setShowEditModal(false);
      setEditingProduct(null);
      alert('Product updated successfully!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.sku}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.stock}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">${item.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${item.status === 'In Stock' && 'bg-green-100 text-green-800'}
                    ${item.status === 'Low Stock' && 'bg-yellow-100 text-yellow-800'}
                    ${item.status === 'Out of Stock' && 'bg-red-100 text-red-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.expiryDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-1 hover:bg-gray-100 rounded"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      className="p-1 hover:bg-gray-100 rounded"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                    <div className="relative">
                      <button 
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={() => setShowActions(showActions === item.id ? null : item.id)}
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                      {showActions === item.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                          <div className="py-1">
                            <button 
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                handleViewDetails(item);
                                setShowActions(null);
                              }}
                            >
                              View Details
                            </button>
                            <button 
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                handleUpdateStock(item);
                                setShowActions(null);
                              }}
                            >
                              Update Stock
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Edit Medical Product</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value, 10) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="PPE">PPE</option>
                  <option value="Devices">Devices</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Supplies">Supplies</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  value={editingProduct.expiryDate}
                  onChange={(e) => setEditingProduct({ ...editingProduct, expiryDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;