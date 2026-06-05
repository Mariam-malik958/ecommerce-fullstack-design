import React, { useState, useEffect } from "react";
import { Package, Truck, CheckCircle, Clock, ChevronDown, Calendar, CreditCard, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:5000/api/orders/user/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  // status field + isPaid + isDelivered teeno check karta hai
  const getStatusDetails = (isPaid, isDelivered, status) => {
    if (isDelivered || status === "delivered") {
      return {
        icon: <CheckCircle size={16} />,
        bg: "#f0fdf4",
        color: "#166534",
        border: "#bbf7d0",
        text: "Delivered",
      };
    } else if (status === "confirmed" || isPaid) {
      return {
        icon: <Truck size={16} />,
        bg: "#fffbeb",
        color: "#92400e",
        border: "#fde68a",
        text: "Confirmed — On The Way",
      };
    } else {
      return {
        icon: <Clock size={16} />,
        bg: "#eff6ff",
        color: "#1e40af",
        border: "#bfdbfe",
        text: "Processing",
      };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft size={18} /> Back to Home
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-['Sora']">Purchase History</h1>
          <p className="text-gray-600">Verify, track status and manage your recent orders</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            {error}
          </div>
        )}

        {/* Orders List */}
        {!orders || orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-lg font-semibold text-gray-900 mb-2">No orders found.</p>
            <p className="text-gray-500 mb-6">Proceed from cart page to place an order.</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              // status field bhi pass karo
              const statusStyle = getStatusDetails(order.isPaid, order.isDelivered, order.status);
              const orderDate = new Date(order.createdAt).toLocaleDateString();

              return (
                <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Order Header */}
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
                      <div>
                        <span className="text-xs font-medium text-gray-500">Order ID</span>
                        <h3 className="text-sm font-bold text-gray-900 truncate">#{order._id.slice(-8).toUpperCase()}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        <div>
                          <span className="text-xs font-medium text-gray-500">Date</span>
                          <p className="text-sm font-semibold text-gray-900">{orderDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard size={14} className="text-gray-400" />
                        <div>
                          <span className="text-xs font-medium text-gray-500">Total</span>
                          <p className="text-sm font-bold text-blue-600">${order.totalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="px-3 py-1 rounded-full flex items-center gap-1 text-xs font-semibold"
                          style={{
                            background: statusStyle.bg,
                            color: statusStyle.color,
                            border: `1px solid ${statusStyle.border}`,
                          }}
                        >
                          {statusStyle.icon}
                          <span>{statusStyle.text}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <ChevronDown
                        size={20}
                        style={{
                          transform: expandedOrder === order._id ? "rotate(180deg)" : "rotate(0)",
                          transition: "transform 0.2s ease",
                        }}
                      />
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {expandedOrder === order._id && (
                    <div className="p-4 sm:p-6 border-t border-gray-100">
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Items Ordered</h4>
                        <div className="space-y-2">
                          {order.orderItems && order.orderItems.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                              {item.image && (
                                <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded" />
                              )}
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.qty} × ${item.price.toFixed(2)}</p>
                              </div>
                              <p className="font-semibold text-gray-900">${(item.qty * item.price).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-gray-900 mb-2">Shipping Address</h4>
                        <p className="text-sm text-gray-700">
                          {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}
                        </p>
                        <p className="text-sm text-gray-700">Postal Code: {order.shippingAddress.postalCode}</p>
                      </div>

                      {/* Order Summary */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                          <span>Payment Method:</span>
                          <span className="font-semibold text-gray-900">{order.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Order Status:</span>
                          <span
                            className="font-semibold px-2 py-0.5 rounded-full text-xs"
                            style={{
                              background: statusStyle.bg,
                              color: statusStyle.color,
                              border: `1px solid ${statusStyle.border}`,
                            }}
                          >
                            {statusStyle.text}
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Payment:</span>
                          <span className="font-semibold text-gray-900">
                            {order.isPaid ? "✅ Paid" : "⏳ Pending"}
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-600 border-t border-gray-200 pt-2 mt-2">
                          <span className="font-semibold">Total Amount:</span>
                          <span className="font-bold text-blue-600">${order.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}