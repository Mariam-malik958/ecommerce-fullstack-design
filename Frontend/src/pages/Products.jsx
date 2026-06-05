import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx"; // Ensure this import matches your file structure

const Products = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(null);

  // Unified list of premium products based on your data structure
  const products = [
    {
      id: 1,
      name: "iPhone 14 Pro Max",
      brand: "Apple",
      price: 99.50,
      category: "Electronics",
      image: "/images/image 32.png",
      description: "High-quality smartphone with advanced dynamic features.",
    },
    {
      id: 2,
      name: "Galaxy S24 Ultra",
      brand: "Samsung",
      price: 120.00,
      category: "Electronics",
      image: "/images/image 33.png",
      description: "Luxury device featuring state of the art premium tech.",
    },
    {
      id: 3,
      name: "Huawei Nova 11i",
      brand: "Huawei",
      price: 85.00,
      category: "Electronics",
      image: "/images/image 34.png",
      description: "Sleek and highly portable premium sound smartphone.",
    },
    {
      id: 4,
      name: "Pocco X5 Pro 5G",
      brand: "Pocco",
      price: 70.00,
      category: "Electronics",
      image: "/images/image 23.png",
      description: "Durable layout performance optimized mobile tech.",
    }
  ];

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleAddToCart = (product) => {
    setLoading(product.id);
    
    // Simulate API call
    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      showNotification(`✅ ${product.name} added to cart!`);
      setLoading(null);
    }, 500);
  };

  return (
    <div className="products-page">
      {/* NOTIFICATION */}
      {notification && (
        <div className="notification notification-success">
          {notification}
        </div>
      )}

      {/* NAVBAR */}
      <header className="navbar">
        <div className="container nav-content">
          <div className="logo" onClick={() => navigate("/")}>
            <div className="logo-box">B</div>
            <h2>Brand</h2>
          </div>

          <button
            className="cart-btn"
            onClick={() => navigate("/cart")}
          >
            🛒 Go to Cart
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="container">
        <div className="products-header">
          <h1>Our Products</h1>
          <p>Discover our amazing collection of premium products</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                {/* Desktop Overlay Mode */}
                <div className="product-overlay">
                  <button
                    className="add-btn"
                    onClick={() => handleAddToCart(product)}
                    disabled={loading === product.id}
                  >
                    {loading === product.id ? "Adding..." : "Add to Cart"}
                  </button>
                </div>
              </div>

              <div className="product-info">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="category-badge">{product.category}</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#718096' }}>{product.brand}</span>
                </div>
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <div className="product-footer">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <span className="rating">⭐ 4.5</span>
                </div>
                
                {/* Mobile View Add to Cart Button (Visible only on smaller devices) */}
                <div className="mobile-action-wrapper">
                  <button
                    className="mobile-add-btn"
                    onClick={() => handleAddToCart(product)}
                    disabled={loading === product.id}
                  >
                    {loading === product.id ? "Adding..." : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', sans-serif;
          background: #f8fafc;
          color: #1a202c;
        }

        .products-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
        }

        .container {
          width: 100%;
          max-width: 1300px;
          margin: auto;
          padding: 0 20px;
        }

        /* NAVBAR */
        .navbar {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .nav-content {
          height: 75px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .logo-box {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, #0d6efd 0%, #0a5ce8 100%);
          border-radius: 12px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
        }

        .logo h2 {
          color: #0d6efd;
          font-size: 28px;
          font-weight: 800;
        }

        .cart-btn {
          background: linear-gradient(135deg, #0d6efd 0%, #0a5ce8 100%);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 700;
          font-size: 14px;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
        }

        .cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(13, 110, 253, 0.4);
        }

        /* HEADER */
        .products-header {
          text-align: center;
          margin: 60px 0 50px;
        }

        .products-header h1 {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .products-header p {
          color: #718096;
          font-size: 16px;
        }

        /* GRID */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 28px;
          margin-bottom: 60px;
        }

        /* PRODUCT CARD */
        .product-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: slideIn 0.4s ease-out;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
          border-color: #0d6efd;
        }

        .product-image {
          position: relative;
          width: 100%;
          height: 250px;
          overflow: hidden;
          background: #ffffff;
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s;
        }

        .product-card:hover .product-image img {
          transform: scale(1.05);
        }

        .product-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }

        .add-btn {
          background: linear-gradient(135deg, #0d6efd 0%, #0a5ce8 100%);
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
        }

        .add-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(13, 110, 253, 0.4);
        }

        .add-btn:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .product-info {
          padding: 20px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .category-badge {
          display: inline-block;
          background: #eef2ff;
          color: #0d6efd;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .product-info h3 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #1a202c;
          line-clamp: 2;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 2.4em;
        }

        .description {
          color: #718096;
          font-size: 13px;
          margin-bottom: 16px;
          line-clamp: 2;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 2.6em;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid #e2e8f0;
        }

        .price {
          font-size: 20px;
          font-weight: 800;
          color: #0d6efd;
        }

        .rating {
          font-size: 13px;
          color: #718096;
        }

        .mobile-action-wrapper {
          display: none;
        }

        /* NOTIFICATION */
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 16px 20px;
          border-radius: 10px;
          z-index: 999;
          animation: slideInRight 0.3s ease;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          font-weight: 600;
          font-size: 14px;
        }

        .notification-success {
          background: #dcfce7;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }

        @keyframes slideInRight {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        /* FLEXIBLE BREAKPOINTS FOR SECURE DISPLAY */
        @media (max-width: 850px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
            gap: 20px;
          }
          .products-header h1 { font-size: 36px; margin-bottom: 8px; }
          .product-image { height: 210px; }
          .product-header { margin: 40px 0 30px; }
        }

        @media (max-width: 600px) {
          .product-overlay {
            display: none !important; /* Disables hover lock overlay triggers for standard mobile touches */
          }
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 14px;
          }
          .container { padding: 0 12px; }
          .navbar { height: 65px; }
          .logo h2 { font-size: 22px; }
          .logo-box { width: 36px; height: 36px; font-size: 18px; border-radius: 8px; }
          .cart-btn { padding: 8px 14px; font-size: 12px; }
          .products-header h1 { font-size: 26px; }
          .products-header p { font-size: 13px; }
          
          .product-card { border-radius: 12px; }
          .product-image { height: 150px; padding: 10px; }
          .product-info { padding: 12px; }
          .product-info h3 { font-size: 14px; height: 2.4em; margin-bottom: 4px; }
          .category-badge { padding: 4px 8px; font-size: 9px; }
          .description { font-size: 11px; margin-bottom: 10px; height: 2.6em; }
          .price { font-size: 16px; }
          
          /* Show fixed action layout directly under item grid details for easy mobile cart access */
          .mobile-action-wrapper {
            display: block;
            margin-top: 12px;
            width: 100%;
          }
          .mobile-add-btn {
            width: 100%;
            background: linear-gradient(135deg, #0d6efd 0%, #0a5ce8 100%);
            color: white;
            border: none;
            padding: 10px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 13px;
            cursor: pointer;
          }
        }
      `}</style>
    </div>
  );
};

export default Products;