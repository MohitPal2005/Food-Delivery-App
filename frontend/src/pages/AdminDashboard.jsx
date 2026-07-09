import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, PlusCircle, Image as ImageIcon, Tag, DollarSign, Type, FileText, CheckCircle2 } from 'lucide-react';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [foodData, setFoodData] = useState({ name: '', description: '', price: '', category: '', imageUrl: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menu');
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setFoodData({ ...foodData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/menu/${editingId}`, foodData);
        setMessage('Food item updated successfully!');
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/api/menu', foodData);
        setMessage('Food item added successfully!');
      }
      setFoodData({ name: '', description: '', price: '', category: '', imageUrl: '' });
      fetchItems();
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      setMessage('Operation failed.');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFoodData({ 
      name: item.name, 
      description: item.description, 
      price: item.price, 
      category: item.category,
      imageUrl: item.imageUrl || '' 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:5000/api/menu/${id}`);
        setMessage('Item deleted successfully!');
        fetchItems();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Delete failed.');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: The Form */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-orange-500" />
              {editingId ? 'Edit Food Item' : 'Add New Food Item'}
            </h2>
            
            {message && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" /> {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Type className="h-4 w-4 text-gray-400" /></div>
                <input type="text" name="name" placeholder="Food Name" value={foodData.name} onChange={handleChange} required className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 text-sm" />
              </div>
              
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none"><FileText className="h-4 w-4 text-gray-400" /></div>
                <textarea name="description" placeholder="Description" value={foodData.description} onChange={handleChange} required rows="3" className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 text-sm resize-none"></textarea>
              </div>

              <div className="flex gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><DollarSign className="h-4 w-4 text-gray-400" /></div>
                  <input type="number" name="price" placeholder="Price" value={foodData.price} onChange={handleChange} required className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 text-sm" />
                </div>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Tag className="h-4 w-4 text-gray-400" /></div>
                  <input type="text" name="category" placeholder="Category" value={foodData.category} onChange={handleChange} required className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 text-sm" />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><ImageIcon className="h-4 w-4 text-gray-400" /></div>
                <input type="text" name="imageUrl" placeholder="Image URL" value={foodData.imageUrl} onChange={handleChange} className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 text-sm" />
              </div>

              <button type="submit" className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gray-900 hover:bg-orange-500 transition-colors duration-200 mt-2">
                {editingId ? 'Update Menu Item' : 'Add to Menu'}
              </button>
              
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setFoodData({ name: '', description: '', price: '', category: '', imageUrl: '' }); }} className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Right Column: The Table */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">Current Menu Items</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="text-xs uppercase bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Item</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img src={item.imageUrl || "https://via.placeholder.com/40"} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                        <span className="font-semibold text-gray-900">{item.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium">{item.category}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">₹{item.price}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                        Your menu is empty. Add your first item using the form!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;