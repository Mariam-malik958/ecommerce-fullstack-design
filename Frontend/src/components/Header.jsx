import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cartCount } = useCart();

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
          <div className="flex flex-col items-center text-gray-500 cursor-pointer">
            <span className="text-xs">Profile</span>
          </div>

          {/* Messages */}
          <div className="flex flex-col items-center text-gray-500 cursor-pointer">
            <span className="text-xs">Messages</span>
          </div>

          {/* 1. Orders Icon (Badge Removed) */}
          <div className="flex flex-col items-center text-gray-500 cursor-pointer">
            {/* Yahan se humne badge hata diya hai taake order me count na dikhe */}
            <span className="text-xs">Orders</span>
          </div>

          {/* 2. My Cart Icon (With Badge) */}
          <div className="relative flex flex-col items-center text-gray-500 cursor-pointer">
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-between justify-content center px-1">
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