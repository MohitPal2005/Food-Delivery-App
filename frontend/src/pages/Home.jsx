import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart, Utensils, Star, Clock, Flame } from 'lucide-react';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu');
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  // Professional Loading Spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Hero Banner Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 mb-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
        {/* Decorative background circle */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="max-w-xl relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Craving something <span className="text-orange-500">delicious?</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Get the best meals delivered to your door in minutes. Fresh, fast, and hot.
          </p>
          <div className="flex gap-6 text-sm font-medium text-gray-300">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-orange-500"/> Fast Delivery</span>
            <span className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-orange-500"/> Hot & Fresh</span>
          </div>
        </div>
      </div>

      {/* Menu Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Utensils className="w-6 h-6 text-orange-500" />
          Popular Menu
        </h2>
      </div>

      {/* Food Grid */}
      {items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-lg">No food items available right now. Go to Admin to add some!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col">
              
              {/* Image Container with Hover Zoom */}
              <div className="relative h-56 bg-gray-50 p-4 flex justify-center items-center overflow-hidden">
                <img 
                  src={item.imageUrl || "https://via.placeholder.com/150"} 
                  alt={item.name} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                {/* Fake Rating Badge for UI Polish */}
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" /> 4.8
                </div>
              </div>
              
              {/* Content Container */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                  <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-md ml-2 whitespace-nowrap">
                    {item.category}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
                  {item.description}
                </p>
                
                {/* Price and Add to Cart Row */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-2xl font-black text-gray-900">
                    ₹{item.price}
                  </span>
                  <button className="bg-gray-900 hover:bg-orange-500 text-white p-3 rounded-xl transition-colors duration-200 shadow-sm flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;