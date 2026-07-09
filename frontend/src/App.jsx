import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingBag, Home as HomeIcon, LayoutDashboard, LogIn, UserPlus, LogOut, User } from 'lucide-react';

import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';

function App() {
  // 1. Read the user data from local storage
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // 2. Create a logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Refresh and send to login
  };

  return (
    <Router>
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-orange-500 p-2 rounded-lg group-hover:bg-orange-600 transition-colors">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-900">
                Food<span className="text-orange-500">Express</span>
              </span>
            </Link>

            {/* Middle Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="flex items-center gap-1.5 text-gray-600 hover:text-orange-500 font-medium transition-colors">
                <HomeIcon className="w-4 h-4" /> 
                Home
              </Link>
              
              {/* Only show Admin link if a user is logged in (Optional UI polish) */}
              {user && (
                <Link to="/admin" className="flex items-center gap-1.5 text-gray-600 hover:text-orange-500 font-medium transition-colors">
                  <LayoutDashboard className="w-4 h-4" /> 
                  Admin
                </Link>
              )}
            </div>

            {/* Auth/Action Buttons (The Smart Section) */}
            <div className="flex items-center space-x-4">
              {user ? (
                /* IF LOGGED IN: Show Profile and Logout */
                <>
                  <div className="hidden sm:flex items-center gap-2 text-gray-700 font-semibold mr-2 border-r border-gray-200 pr-4">
                    <div className="bg-orange-100 p-1.5 rounded-full">
                      <User className="w-4 h-4 text-orange-600" />
                    </div>
                    Hi, {user.name.split(' ')[0]}
                  </div>
                  <button onClick={handleLogout} className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 font-medium transition-colors">
                    <LogOut className="w-4 h-4" /> 
                    Logout
                  </button>
                </>
              ) : (
                /* IF LOGGED OUT: Show Login and Sign Up */
                <>
                  <Link to="/login" className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium transition-colors">
                    <LogIn className="w-4 h-4" /> 
                    Login
                  </Link>
                  <Link to="/register" className="flex items-center gap-1.5 bg-orange-500 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-600 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                    <UserPlus className="w-4 h-4" /> 
                    Sign Up
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-slate-50 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;