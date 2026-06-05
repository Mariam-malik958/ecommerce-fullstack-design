import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import ProductListView from "./pages/ProductListView.jsx";
import WebGridView from "./pages/WebGridView.jsx";
import Profile from "./pages/Profile.jsx";
import Message from "./pages/Message.jsx";
import Order from "./pages/Order.jsx";
// Login page ko import kiya
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminAddProduct from "./pages/AdminAddProduct.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";

// Extension (.js) hata kar simple aur standard import kar diya hai
import { OrderProvider } from "./context/OrderContext";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <OrderProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<ProductListView />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/list" element={<ProductListView />} />
          <Route path="/grid" element={<WebGridView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Message />} />
          <Route path="/orders" element={<Order />} />
          {/* Naya Login Route yahan add kar diya hai */}
          <Route path="/login" element={<Login />} />
          {/* Signup Route */}
          <Route path="/signup" element={<Signup />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add-product" element={<AdminAddProduct />} />
          </Route>
        </Routes>
      </OrderProvider>
    </UserProvider>
  );
};

export default App;