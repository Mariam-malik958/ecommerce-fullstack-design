import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

export default function Header() {
  const { cartItems } = useCart();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const cartCount = cartItems ? cartItems.length : 0;

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowProfileMenu(false);
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <span className="font-bold text-xl text-blue-600">Brand</span>
        </Link>

        {/* Icons Section */}
        <div className="flex flex-wrap items-center gap-6">
          
          {/* Profile */}
          <div className="relative flex flex-col items-center text-gray-500 cursor-pointer">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              <span className="text-xl">👤</span>
              <span className="text-xs">{user ? user.name.split(" ")[0] : "Profile"}</span>
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && user && (
              <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    navigate("/profile");
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex flex-col items-center text-gray-500 cursor-pointer">
            <span className="text-xs">Messages</span>
          </div>

          {/* Orders Icon */}
          <div className="flex flex-col items-center text-gray-500 cursor-pointer">
            <span className="text-xs">Orders</span>
          </div>

          {/* My Cart Icon (With Badge) */}
          <div className="relative flex flex-col items-center text-gray-500 cursor-pointer">
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-xs">My cart</span>
          </div>

        </div>
      </div>
    </header>
  );
}