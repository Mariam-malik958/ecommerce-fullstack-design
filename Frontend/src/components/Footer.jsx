import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const links = {
    About: ["About Us", "Find store", "Categories", "Blogs"],
    Information: ["Help Center", "Money Refund", "Shipping", "Contact us"],
    "For users": ["Login", "Register", "Settings", "My Orders"]
  };

  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span className="text-xl font-bold text-blue-600">zentro</span>
            </div>
            <p className="text-sm text-gray-600">Best information about the company goes here.</p>
          </div>
          
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-semibold mb-3 text-sm">{title}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {items.map(item => (
                  <li key={item} className="hover:text-blue-600 cursor-pointer">
                    {item === "Login" ? (
                      <Link to="/signin" className="text-gray-600 hover:text-blue-600">{item}</Link>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t mt-6 pt-4 text-center text-sm text-gray-600">
          © 2025 zentro
        </div>
      </div>
    </footer>
  )
}