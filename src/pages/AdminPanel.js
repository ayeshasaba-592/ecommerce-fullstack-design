import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', image: '', category: '' });
  
  // --- ADDED FOR EDIT ---
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Helper to get the Admin Token from LocalStorage
  const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
  };

  // 1. Load products so we can delete/edit them
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('https://my-ecommerce-backend-api.vercel.app/api/products');
      setProducts(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // 2. Handle Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = getAuthHeaders(); // Get the token for protected routes

    try {
      if (isEditing) {
        // Update existing product
        await axios.put(`https://my-ecommerce-backend-api.vercel.app/api/products/${editId}`, formData, config);
        alert("Product Updated!");
      } else {
        // Add new product
        await axios.post('https://my-ecommerce-backend-api.vercel.app/api/products', formData, config);
        alert("Product Added!");
      }
      
      // Reset form and state
      setFormData({ name: '', price: '', description: '', image: '', category: '' });
      setIsEditing(false);
      setEditId(null);
      fetchProducts(); 
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Check Admin Permissions"));
    }
  };

  // 3. Handle Delete
  const handleDelete = async (id) => {
    if(window.confirm("Delete this product?")) {
      const config = getAuthHeaders(); // Get the token for protected routes
      try {
        await axios.delete(`https://my-ecommerce-backend-api.vercel.app/api/products/${id}`, config);
        fetchProducts();
      } catch (err) {
        alert("Delete failed: " + (err.response?.data?.message || "Unauthorized"));
      }
    }
  };

  // Load data into form for editing ---
  const handleEditClick = (product) => {
    setIsEditing(true);
    setEditId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description || '',
      image: product.image || '',
      category: product.category || ''
    });
  };

  return (
    <div style={{ padding: '80px 20px' }}>
      <h1>Admin Dashboard</h1>
      
      {/* ADD/EDIT FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '40px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input placeholder="Price" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
        <input placeholder="Image URL" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
        
        <button type="submit" style={{ backgroundColor: isEditing ? 'orange' : 'green', color: 'white' }}>
          {isEditing ? "Update Product" : "Add Product"}
        </button>
        
        {isEditing && (
          <button type="button" onClick={() => { setIsEditing(false); setFormData({name:'', price:'', description:'', image:'', category:''}) }}>
            Cancel
          </button>
        )}
      </form>

      {/* PRODUCT LIST WITH DELETE AND EDIT */}
      <table border="1" width="100%" style={{ textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>
                  {/* --- EDIT BUTTON --- */}
                  <button onClick={() => handleEditClick(p)} style={{ backgroundColor: 'orange', color: 'white', marginRight: '5px' }}>Edit</button>
                  <button onClick={() => handleDelete(p._id)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>No products found or loading...</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;