import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All category");
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const categories = [
    "Electronics",
    "Clothes and wear",
    "Home interiors",
    "Sports and outdoor",
  ];

  const navLinks = [
    { icon: "👤", label: "Profile", path: "/profile" },
    { icon: "💬", label: "Message", path: "/messages" },
    { icon: "📋", label: "Orders", path: "/orders" },
    { icon: "🛒", label: "My cart", path: "/cart" }
  ];

  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #e8e8e8" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontWeight: 700,
            fontSize: 18,
            color: "#4096ff",
            minWidth: 90,
            cursor: "pointer"
          }}
        >
          <img
            src="/images/logo.png"
            alt="Logo"
            style={{
              width: 140,
              height: 40,
              objectFit: "contain",
            }}
          />
        </div>

        {/* Search bar */}
        <div
          style={{
            flex: 1,
            display: "flex",
            minWidth: 200,
            border: "2px solid #0D6EFD",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              padding: "8px 12px",
              fontSize: 13,
            }}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              border: "none",
              borderLeft: "2px solid #0D6EFD",
              color: "black",
              padding: "0 8px",
              fontSize: 14,
              background: "#fff",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="All category">All category</option>
            {categories?.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            style={{
              background: "#0D6EFD",
              color: "#fff",
              border: "none",
              padding: "0 16px",
              cursor: "pointer",
              fontSize: 15,
            }}
          >
            Search
          </button>
        </div>

        {/* Right icons */}
        <div
          style={{
            display: "flex",
            gap: 20,
            fontSize: 12,
            color: "#555",
          }}
        >
          {navLinks.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span>{item.label}</span>

              {item.label === "My cart" && cartItems && cartItems.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    background: "#FA5252",
                    color: "white",
                    borderRadius: "50%",
                    width: "16px",
                    height: "16px",
                    fontSize: "10px",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartItems.length}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}