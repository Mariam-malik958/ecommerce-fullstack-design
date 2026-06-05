import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  LogOut,
  Plus,
  Trash2,
  Edit,
  X,
  Layers,
  DollarSign,
  Boxes,
  Info,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Trash
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters State
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("All");
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' | 'edit'
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "Electronics",
    stock: "",
  });
  const [imageStatus, setImageStatus] = useState("idle"); // idle | loading | success | error
  const [saving, setSaving] = useState(false);
  
  const navigate = useNavigate();
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

  const handleLogout = () => {
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = {
          Authorization: `Bearer ${adminInfo?.token}`,
        };

        // Fetch Products
        const prodRes = await fetch("http://localhost:5000/api/products");
        const prodData = await prodRes.json();
        setProducts(prodData);

        // Fetch Orders
        const orderRes = await fetch("http://localhost:5000/api/orders", { headers });
        const orderData = await orderRes.json();
        setOrders(orderData.length ? orderData : []);

        // Fetch Users
        const userRes = await fetch("http://localhost:5000/api/users", { headers });
        const userData = await userRes.json();
        setUsers(userData.length ? userData : []);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [adminInfo?.token]);

  // Handle image loading states for preview
  useEffect(() => {
    if (!formData.image || !formData.image.trim()) {
      setImageStatus("idle");
      return;
    }
    setImageStatus("loading");
    const img = new Image();
    img.onload = () => setImageStatus("success");
    img.onerror = () => setImageStatus("error");
    img.src = formData.image;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [formData.image]);

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminInfo?.token}`,
          },
        });
        if (res.ok) {
          // Use functional state update to avoid stale closure
          setProducts(prev => prev.filter((p) => p._id !== id));
        } else {
          // Attempt to read error message from response
          let message = "Failed to delete product";
          try {
            const data = await res.json();
            if (data && data.message) message = data.message;
          } catch (_) {}
          alert(message);
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while deleting the product.");
      }
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order request permanently from the database? This cannot be undone.")) {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminInfo?.token}`,
          },
        });
        if (res.ok) {
          setOrders(orders.filter((o) => o._id !== id));
          alert("Order request deleted successfully from backend database!");
        } else {
          const errorData = await res.json();
          alert(errorData.message || "Failed to delete order");
        }
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("An error occurred while deleting the order.");
      }
    }
  };

  const handleOpenModal = (type, product = null) => {
    setModalType(type);
    if (type === "edit" && product) {
      setEditingProductId(product._id);
      setFormData({
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category || "Electronics",
        stock: product.stock,
      });
    } else {
      setEditingProductId(null);
      setFormData({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "Electronics",
        stock: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = modalType === "edit" 
        ? `http://localhost:5000/api/products/${editingProductId}`
        : "http://localhost:5000/api/products";
      
      const method = modalType === "edit" ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminInfo?.token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        }),
      });

      if (response.ok) {
        const savedProd = await response.json();
        if (modalType === "edit") {
          setProducts(products.map((p) => p._id === editingProductId ? savedProd : p));
          alert("Product updated successfully!");
        } else {
          setProducts([...products, savedProd]);
          alert("Product added successfully!");
        }
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product details.");
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmOrder = async (id) => {
    if (window.confirm("Confirm this order? This will mark it as Paid/Confirmed and send a real-time email notification to the customer.")) {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/${id}/confirm`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${adminInfo?.token}`,
          },
        });

        if (res.ok) {
          setOrders(orders.map((o) => (o._id === id ? { ...o, isPaid: true } : o)));
          alert("Order confirmed successfully! Real-time email sent to customer.");
        } else {
          const errorData = await res.json();
          alert(errorData.message || "Failed to confirm order");
        }
      } catch (error) {
        console.error("Error confirming order:", error);
        alert("Error confirming order. Please try again.");
      }
    }
  };

  // Filter Logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearchQuery.toLowerCase()) || 
                          p.description?.toLowerCase().includes(productSearchQuery.toLowerCase());
    const matchesCategory = productCategoryFilter === "All" || p.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredOrders = orders.filter(o => {
    const customerName = o.shippingAddress?.name || o.user?.name || "";
    const customerEmail = o.shippingAddress?.email || o.user?.email || "";
    const orderIdString = o._id.toString();
    const matchesSearch = customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) || 
                          customerEmail.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                          orderIdString.toLowerCase().includes(orderSearchQuery.toLowerCase());
    const matchesStatus = orderStatusFilter === "All" || 
                          (orderStatusFilter === "Confirmed" && o.isPaid) || 
                          (orderStatusFilter === "Pending" && !o.isPaid);
    return matchesSearch && matchesStatus;
  });

  // Unique categories for filtering
  const allCategories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];

  // Calculated statistics
  const pendingOrdersCount = orders.filter(o => !o.isPaid).length;
  const confirmedOrdersCount = orders.filter(o => o.isPaid).length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.isPaid ? o.totalPrice : 0), 0);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-semibold tracking-wider text-gray-400">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F1F5F9]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col justify-between shadow-2xl z-20 flex-shrink-0">
        <div>
          {/* Logo Brand Header */}
          <div className="p-6 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Brand Ecommerce
              </h2>
              <p className="text-[10px] text-indigo-300/80 font-bold tracking-wide uppercase mt-0.5">Admin Management</p>
            </div>
          </div>
          
          {/* Admin User Info Card */}
          <div className="px-6 py-4 border-b border-slate-800/60 bg-slate-900/30">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center font-bold text-white shadow-md">
                {adminInfo?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-200 truncate">{adminInfo?.name}</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Super Admin
                </p>
              </div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="py-6 px-4 space-y-1.5">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === 'dashboard' 
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-750 text-white shadow-lg shadow-indigo-600/25' 
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <LayoutDashboard size={18} />
              <span className="font-semibold text-sm">Dashboard Stats</span>
            </button>
            
            <button 
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === 'products' 
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-750 text-white shadow-lg shadow-indigo-600/25' 
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <Package size={18} />
              <span className="font-semibold text-sm">Products Catalog</span>
            </button>

            <button 
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === 'orders' 
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-750 text-white shadow-lg shadow-indigo-600/25' 
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="relative">
                <ShoppingCart size={18} />
                {pendingOrdersCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center animate-bounce">
                    {pendingOrdersCount}
                  </span>
                )}
              </div>
              <span className="font-semibold text-sm">Order Requests</span>
            </button>

            <button 
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === 'users' 
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-750 text-white shadow-lg shadow-indigo-600/25' 
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <Users size={18} />
              <span className="font-semibold text-sm">User Directory</span>
            </button>
          </div>
        </div>

        {/* Logout Control */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/20">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/25 py-2.5 rounded-xl transition-all duration-200 font-semibold text-xs border border-rose-500/20"
          >
            <LogOut size={16} />
            <span>Logout Account</span>
          </button>
        </div>
      </div>

      {/* Main Panel Content container */}
      <div className="flex-1 overflow-auto bg-[#F8FAFC]">
        <div className="p-8 max-w-[1500px] mx-auto">
          
          {/* Dashboard Header Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-5 border-b border-slate-200">
            <div>
              <p className="text-[11px] font-extrabold text-indigo-600 tracking-widest uppercase">System Control</p>
              <h1 className="text-3xl font-black text-slate-800 capitalize tracking-tight mt-1">
                {activeTab === 'dashboard' ? 'Overview Stats' : `${activeTab} Management`}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm">
                Server status: <span className="text-emerald-500 font-bold ml-1">● Online</span>
              </span>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Statistics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Total Products Stat */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between hover:shadow-md transition-all duration-300">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Total Products</p>
                    <p className="text-3xl font-black text-slate-800">{products.length}</p>
                    <span className="text-[10px] text-indigo-500 font-bold">Active in Catalog</span>
                  </div>
                  <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
                    <Boxes size={22}/>
                  </div>
                </div>

                {/* Total Orders Stat */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between hover:shadow-md transition-all duration-300">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Total Orders</p>
                    <p className="text-3xl font-black text-slate-800">{orders.length}</p>
                    <span className="text-[10px] text-rose-500 font-bold">{pendingOrdersCount} Pending Actions</span>
                  </div>
                  <div className="p-4 bg-rose-50/70 text-rose-600 rounded-2xl border border-rose-100">
                    <ShoppingCart size={22}/>
                  </div>
                </div>

                {/* Total Revenue Stat */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between hover:shadow-md transition-all duration-300">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Total Revenue</p>
                    <p className="text-3xl font-black text-emerald-600">${totalRevenue?.toFixed(2)}</p>
                    <span className="text-[10px] text-emerald-500 font-bold">From Paid Orders</span>
                  </div>
                  <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
                    <DollarSign size={22}/>
                  </div>
                </div>

                {/* Users Stat Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between hover:shadow-md transition-all duration-300">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Registered Users</p>
                    <p className="text-3xl font-black text-slate-800">{users.length}</p>
                    <span className="text-[10px] text-purple-500 font-bold">Customer Profiles</span>
                  </div>
                  <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
                    <Users size={22}/>
                  </div>
                </div>
              </div>

              {/* Fast Activity summary card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Platform Activity Summary</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-2xl mb-4">
                  Welcome to your unified administration panel. From here, you have root control over your entire inventory. 
                  Add products directly to specific categories, modify prices and stock allocations, and process consumer orders seamlessly.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-150 flex items-start gap-3">
                    <Info size={16} className="text-indigo-500 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">Quick Inventory Management</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Navigate to the Products Database tab to check real-time stock limits or add new e-commerce merchandise in seconds.</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-150 flex items-start gap-3">
                    <Info size={16} className="text-emerald-500 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">Client Order Status Tracker</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Review processing transactions under Order Requests. Admin validations send instant alerts to customer emails.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Header and Add Trigger */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Products Catalog ({filteredProducts.length})</h2>
                  <p className="text-xs text-slate-500">Edit, add, or delete listed digital items in your store.</p>
                </div>
                <button 
                  onClick={() => handleOpenModal("add")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-md shadow-indigo-600/15"
                >
                  <Plus size={18} />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Advanced Search & Filtering Area */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-80">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by name or description..."
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-xs font-medium text-slate-700 bg-slate-50/50 transition-colors"
                  />
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                    <Filter size={14} /> Filter Category:
                  </span>
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Automobiles">Automobiles</option>
                    <option value="Clothes and wear">Clothes and wear</option>
                    <option value="Home interiors">Home interiors</option>
                    <option value="Computer and tech">Computer and tech</option>
                    <option value="Tools, equipments">Tools, equipments</option>
                    <option value="Sports and outdoor">Sports and outdoor</option>
                    <option value="Animal and pets">Animal and pets</option>
                    <option value="Machinery tools">Machinery tools</option>
                    <option value="Gift boxes">Gift boxes</option>
                    <option value="More category">More category</option>
                  </select>
                </div>
              </div>

              {/* Grid categories grouped products list */}
              {Object.entries(
                filteredProducts.reduce((acc, product) => {
                  const category = product.category || "Uncategorized";
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(product);
                  return acc;
                }, {})
              ).map(([category, items]) => (
                <div key={category} className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden mb-8">
                  <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-widest">{category}</h3>
                    <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 border border-indigo-100/60 px-2.5 py-0.5 rounded-full">
                      {items.length} {items.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50/40 border-b border-slate-100">
                        <tr>
                          <th className="p-4 pl-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product Info</th>
                          <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price ($)</th>
                          <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quantity</th>
                          <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Storage status</th>
                          <th className="p-4 pr-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {items.map(p => (
                          <tr key={p._id} className="hover:bg-slate-50/45 transition-colors">
                            <td className="p-4 pl-6 flex items-center space-x-3.5">
                              <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-inner bg-slate-150 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="font-bold text-slate-800 text-sm truncate max-w-[240px]" title={p.name}>{p.name}</p>
                                <p className="text-[11px] text-slate-400 truncate max-w-[280px] mt-0.5">{p.description}</p>
                              </div>
                            </td>
                            <td className="p-4 text-emerald-600 font-extrabold text-sm">${p.price?.toFixed(2)}</td>
                            <td className="p-4 font-semibold text-slate-700 text-sm">{p.stock}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-block border ${
                                p.stock > 10 
                                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                  : p.stock > 0 
                                    ? 'bg-amber-50 text-amber-600 border-amber-100'
                                    : 'bg-rose-50 text-rose-600 border-rose-100'
                              }`}>
                                {p.stock > 10 ? 'In Stock' : p.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                              </span>
                            </td>
                            <td className="p-4 pr-6 text-right">
                              <div className="flex justify-end items-center gap-1">
                                <button 
                                  onClick={() => handleOpenModal("edit", p)} 
                                  className="p-2 text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-150 rounded-lg transition-all"
                                  title="Edit Product"
                                >
                                  <Edit size={15} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteProduct(p._id)} 
                                  className="p-2 text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-150 rounded-lg transition-all"
                                  title="Delete Product"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-14 text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <Package size={44} className="mx-auto text-slate-300 mb-3" />
                  <p className="font-bold text-slate-700 text-sm">No products found matching filters.</p>
                  <p className="text-xs text-slate-400 mt-1">Try resetting search string or selecting another Category filter.</p>
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Header block */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">E-Commerce Orders ({filteredOrders.length})</h2>
                  <p className="text-xs text-slate-500">View and manage customer checkout receipts permanently.</p>
                </div>
                
                {/* Micro Stats inside Orders Page */}
                <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 bg-white shadow-sm border border-slate-100 px-3 py-1 rounded-lg flex items-center gap-1">
                    <Clock size={11} className="text-amber-500" /> Pending: <strong className="text-slate-800">{pendingOrdersCount}</strong>
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 bg-white shadow-sm border border-slate-100 px-3 py-1 rounded-lg flex items-center gap-1">
                    <CheckCircle size={11} className="text-emerald-500" /> Confirmed: <strong className="text-slate-800">{confirmedOrdersCount}</strong>
                  </span>
                </div>
              </div>

              {/* Order Filtering Search Panel */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-80">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by ID, client name or email..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-xs font-medium text-slate-700 bg-slate-50/50 transition-colors"
                  />
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                    <Filter size={14} /> Status:
                  </span>
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="All">All Transactions</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              {/* Orders Table Container */}
              {filteredOrders.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="p-4 pl-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
                          <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                          <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shipping Address</th>
                          <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Items Ordered</th>
                          <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Price</th>
                          <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                          <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Checkout Date</th>
                          <th className="p-4 pr-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredOrders.map(order => (
                          <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 pl-6 font-bold text-slate-800 text-xs">#{order._id.slice(-8).toUpperCase()}</td>
                            <td className="p-4 text-slate-600">
                              <div className="font-bold text-slate-800 text-sm">{order.shippingAddress?.name || order.user?.name || 'N/A'}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5">{order.shippingAddress?.email || order.user?.email || 'N/A'}</div>
                            </td>
                            <td className="p-4 text-xs text-slate-600">
                              <div className="truncate max-w-[180px] font-bold text-slate-700" title={order.shippingAddress?.address}>{order.shippingAddress?.address}</div>
                              <div className="text-slate-500 mt-0.5">{order.shippingAddress?.city}, {order.shippingAddress?.country}</div>
                              <div className="text-slate-400 font-mono text-[10px] mt-0.5">{order.shippingAddress?.postalCode}</div>
                            </td>
                            <td className="p-4 text-xs text-slate-600">
                              <div className="max-h-[80px] overflow-y-auto space-y-1">
                                {order.orderItems?.map((item, idx) => (
                                  <div key={idx} className="flex justify-between gap-4 border-b border-slate-100/50 pb-0.5 last:border-0">
                                    <span className="font-semibold text-slate-700 truncate max-w-[140px]">{item.name}</span>
                                    <span className="text-slate-400 whitespace-nowrap">x{item.qty}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 text-emerald-600 font-extrabold text-sm">${order.totalPrice?.toFixed(2)}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold inline-block border ${
                                order.isPaid 
                                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                  : 'bg-amber-50 text-amber-600 border-amber-100'
                              }`}>
                                {order.isPaid ? '✅ Confirmed' : '⏳ Pending'}
                              </span>
                            </td>
                            <td className="p-4 text-slate-500 text-xs whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="p-4 pr-6 text-right">
                              <div className="flex justify-end items-center gap-2">
                                {!order.isPaid ? (
                                  <button
                                    onClick={() => handleConfirmOrder(order._id)}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-1.5 px-3.5 rounded-xl shadow-md shadow-emerald-600/10 hover:shadow transition-all text-xs whitespace-nowrap"
                                  >
                                    Confirm
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-slate-400 font-extrabold tracking-wide uppercase italic mr-1">Validated</span>
                                )}
                                
                                {/* Database Order Deletion Action Trigger */}
                                <button
                                  onClick={() => handleDeleteOrder(order._id)}
                                  className="p-2 text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg transition-all"
                                  title="Delete order permanently from database"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-10 text-center text-slate-500">
                  <ShoppingCart size={44} className="mx-auto text-slate-300 mb-3" />
                  <p className="font-bold text-slate-700 text-sm">No orders found matching filters.</p>
                  <p className="text-xs text-slate-400 mt-1">Pending payments or checkouts will show up here.</p>
                </div>
              )}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Website Users Database</h2>
                <p className="text-xs text-slate-500">Directory of all registered client profiles.</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="p-4 pl-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">User Initial</th>
                        <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
                        <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</th>
                        <th className="p-4 pr-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Account Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {users.map(u => (
                        <tr key={u._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 pl-6">
                            <div className="w-8 h-8 rounded-full bg-slate-150 border border-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                              {u.name?.charAt(0).toUpperCase()}
                            </div>
                          </td>
                          <td className="p-4 font-bold text-slate-800 text-sm">{u.name}</td>
                          <td className="p-4 text-slate-600 text-sm font-semibold">{u.email}</td>
                          <td className="p-4 pr-6 text-right">
                            <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold inline-block border ${
                              u.isAdmin 
                                ? 'bg-indigo-50 text-indigo-600 border-indigo-100' 
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}>
                              {u.isAdmin ? 'System Admin' : 'Customer Account'}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {users.length === 0 && (
                        <tr>
                          <td colSpan="4" className="p-10 text-center text-slate-400">
                            No registered users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* SLEEK PRODUCT ADD/EDIT MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeInFast">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-100 overflow-hidden flex flex-col my-8 animate-scaleUp">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-800">
                  {modalType === "edit" ? "Edit Product Details" : "Add New Store Product"}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Fill out product parameters to sync to database.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Product Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all text-sm font-semibold text-slate-800 placeholder-slate-400 bg-slate-50/50"
                    placeholder="e.g. Deluxe Smart Watch"
                  />
                </div>

                {/* Product Price */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all text-sm font-semibold text-slate-800 placeholder-slate-400 bg-slate-50/50"
                    placeholder="0.00"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Category Selection
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all text-sm font-semibold text-slate-800 bg-white"
                  >
                    <option value="Automobiles">Automobiles</option>
                    <option value="Clothes and wear">Clothes and wear</option>
                    <option value="Home interiors">Home interiors</option>
                    <option value="Computer and tech">Computer and tech</option>
                    <option value="Tools, equipments">Tools, equipments</option>
                    <option value="Sports and outdoor">Sports and outdoor</option>
                    <option value="Animal and pets">Animal and pets</option>
                    <option value="Machinery tools">Machinery tools</option>
                    <option value="Gift boxes">Gift boxes</option>
                    <option value="More category">More category</option>
                  </select>
                </div>

                {/* Stock Quantity */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Initial Stock Count
                  </label>
                  <input
                    type="number"
                    name="stock"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all text-sm font-semibold text-slate-800 placeholder-slate-400 bg-slate-50/50"
                    placeholder="100"
                  />
                </div>
              </div>

              {/* Image URL Link with Live Preview Box */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Product Image URL link
                </label>
                <div className="flex gap-4 items-start">
                  <input
                    type="text"
                    name="image"
                    required
                    value={formData.image}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all text-sm font-semibold text-slate-800 placeholder-slate-400 bg-slate-50/50"
                    placeholder="Paste absolute link or relative path e.g. /images/watch.png"
                  />

                  {formData.image && (
                    <div className="w-16 h-16 border rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center bg-slate-50"
                      style={{
                        borderColor: imageStatus === "success" ? "#10b981" : imageStatus === "error" ? "#f43f5e" : "#e2e8f0"
                      }}
                    >
                      {imageStatus === "loading" && (
                        <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                      )}
                      {imageStatus === "success" && (
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      )}
                      {imageStatus === "error" && (
                        <span className="text-[10px] text-rose-500 font-bold text-center px-1 leading-tight">No image</span>
                      )}
                    </div>
                  )}
                </div>
                
                <span className="block text-[10px] text-slate-400 font-medium mt-1">
                  Use relative assets folder paths (e.g. <code className="bg-slate-100 text-indigo-600 px-1 rounded">/images/watch.png</code>) or remote Unsplash links.
                </span>
              </div>

              {/* Product description */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Detailed product Description
                </label>
                <textarea
                  name="description"
                  required
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all text-sm font-semibold text-slate-800 placeholder-slate-400 bg-slate-50/50"
                  placeholder="Tell clients details about this store product..."
                />
              </div>

              {/* Save / Cancel buttons */}
              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/15 disabled:bg-indigo-400"
                >
                  {saving ? "Saving..." : modalType === "edit" ? "Update details" : "Create entry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tailwind Animations Injection */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInFast {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        .animate-fadeInFast {
          animation: fadeInFast 0.15s ease forwards;
        }
        .animate-scaleUp {
          animation: scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

    </div>
  );
};

export default AdminDashboard;