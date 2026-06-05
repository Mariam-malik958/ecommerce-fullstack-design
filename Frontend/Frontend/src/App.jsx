import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import ProductListView from "./pages/ProductListView.jsx";
import WebGridView from "./pages/WebGridView.jsx";

import { useCart } from "./context/CartContext.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<ProductListView />} />
      <Route path="/list" element={<ProductListView />} />
      <Route path="/grid" element={<WebGridView />} />
    </Routes>
  );
};

export default App;