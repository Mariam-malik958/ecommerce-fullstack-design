import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { 
  FaTrash, FaArrowLeft, FaCreditCard, FaLock, FaShoppingBag, FaTimes, 
  FaTruck, FaMapMarkerAlt, FaGlobe, FaCity, FaEnvelope, FaUser 
} from "react-icons/fa";

const countriesList = [
  { code: "PK", name: "Pakistan", flag: "🇵🇰", cities: ["Bahawalpur", "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Hyderabad", "Sargodha", "Sukkur", "Jhang", "Shekhupura", "Larkana", "Gujrat", "Mardan", "Kasur", "Rahim Yar Khan", "Sahiwal", "Okara"] },
  { code: "US", name: "United States", flag: "🇺🇸", cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "San Francisco", "Seattle", "Boston"] },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", cities: ["London", "Birmingham", "Manchester", "Glasgow", "Liverpool", "Leeds", "Sheffield", "Bristol", "Belfast", "Edinburgh"] },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", cities: ["Dubai", "Abu Dhabi", "Sharjah", "Al Ain", "Ajman", "Ras Al Khaimah", "Fujairah"] },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", cities: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Taif", "Al Khobar"] },
  { code: "CA", name: "Canada", flag: "🇨🇦", cities: ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg"] },
  { code: "AU", name: "Australia", flag: "🇦🇺", cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Canberra"] },
  { code: "IN", name: "India", flag: "🇮🇳", cities: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune", "Jaipur"] },
  { code: "OTHER", name: "Other Country", flag: "🌐", cities: [] }
];

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [showShippingModal, setShowShippingModal] = useState(false);
  
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [customCountry, setCustomCountry] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [errors, setErrors] = useState({});

  const [shippingDetails, setShippingDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
    city: "",
    postalCode: "",
    country: "",
  });

  // Automatically parse address if present when modal opens
  useEffect(() => {
    if (showShippingModal) {
      const parts = user?.address ? user.address.split(",") : [];
      let parsedCountry = "";
      let parsedCity = "";
      let parsedAddress = "";

      if (parts.length >= 2) {
        parsedCountry = parts[parts.length - 1].trim();
        parsedCity = parts[parts.length - 2].trim();
        parsedAddress = parts.slice(0, parts.length - 2).join(", ").trim();
      } else if (parts.length === 1) {
        parsedAddress = parts[0].trim();
      }

      // Pre-fill Name & Email if logged in
      const nameVal = user?.name || "";
      const emailVal = user?.email || "";

      const matchedCountry = countriesList.find(
        (c) => c.name.toLowerCase() === parsedCountry.toLowerCase()
      );

      if (matchedCountry) {
        setSelectedCountryCode(matchedCountry.code);
        const isCityInList = matchedCountry.cities.some(
          (c) => c.toLowerCase() === parsedCity.toLowerCase()
        );
        
        setShippingDetails({
          name: nameVal,
          email: emailVal,
          address: parsedAddress || user?.address || "",
          city: isCityInList ? parsedCity : "",
          postalCode: "",
          country: matchedCountry.name,
        });

        if (isCityInList) {
          setSelectedCity(parsedCity);
        } else if (parsedCity) {
          setSelectedCity("CUSTOM_CITY");
          setCustomCity(parsedCity);
          setShippingDetails(prev => ({ ...prev, city: parsedCity }));
        }
      } else {
        // Fallback to Pakistan or empty if not matched
        setSelectedCountryCode("PK");
        setShippingDetails({
          name: nameVal,
          email: emailVal,
          address: parsedAddress || user?.address || "",
          city: "",
          postalCode: "",
          country: "Pakistan",
        });
      }
    }
  }, [showShippingModal, user]);

  const handleCountryChange = (e) => {
    const code = e.target.value;
    setSelectedCountryCode(code);
    
    if (code === "OTHER") {
      setShippingDetails({ ...shippingDetails, country: customCountry, city: "" });
      setSelectedCity("");
    } else {
      const countryObj = countriesList.find((c) => c.code === code);
      setShippingDetails({ ...shippingDetails, country: countryObj ? countryObj.name : "", city: "" });
      setSelectedCity("");
    }
    setErrors({ ...errors, country: "", city: "" });
  };

  const handleCityChange = (e) => {
    const cityValue = e.target.value;
    setSelectedCity(cityValue);
    
    if (cityValue === "CUSTOM_CITY") {
      setShippingDetails({ ...shippingDetails, city: customCity });
    } else {
      setShippingDetails({ ...shippingDetails, city: cityValue });
    }
    setErrors({ ...errors, city: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!shippingDetails.name.trim()) newErrors.name = "Full Name is required";
    
    if (!shippingDetails.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(shippingDetails.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    
    if (!shippingDetails.address.trim()) newErrors.address = "Street Address is required";
    if (!shippingDetails.country.trim()) newErrors.country = "Country is required";
    if (!shippingDetails.city.trim()) newErrors.city = "City is required";
    
    if (!shippingDetails.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    } else {
      const postalRegex = /^[a-zA-Z0-9\s-]{3,10}$/;
      if (!postalRegex.test(shippingDetails.postalCode)) {
        newErrors.postalCode = "Invalid postal code format";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper to get numeric price safely for display
  const getNumericPrice = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  const discount = cartItems.length > 0 ? 10 : 0;
  const finalTotal = Math.max(0, totalPrice - discount);

  const handleCheckoutClick = () => {
    if (!user) {
      setCheckoutMessage("Please login first to place an order");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    if (cartItems.length === 0) {
      setCheckoutMessage("Your cart is empty");
      return;
    }

    setShowShippingModal(true);
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      setCheckoutMessage("❌ Please correct the errors in the form.");
      return;
    }

    setIsCheckingOut(true);
    setCheckoutMessage("");

    try {
      const token = localStorage.getItem("authToken");
      
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.quantity,
          image: item.image,
          price: getNumericPrice(item.price), // ✅ FIX: crash nahi hoga agar price number ho
          product: item._id || item.id,
        })),
        shippingAddress: shippingDetails,
        paymentMethod: "Credit Card",
        totalPrice: finalTotal,
      };

      console.log("Sending order data:", orderData);

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to place order");
      }

      const createdOrder = await response.json();
      setCheckoutMessage("✅ Order placed successfully!");
      clearCart();
      setShowShippingModal(false);
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch (error) {
      console.error("Checkout error:", error);
      setCheckoutMessage("❌ " + (error.message || "Error placing order. Please try again."));
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] font-sans pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0" onClick={() => navigate("/")}>
             <button className="text-gray-500 group-hover:text-blue-600 transition-colors flex-shrink-0">
               <FaArrowLeft size={16} className="sm:w-[18px]" />
             </button>
             <span className="text-sm sm:text-xl font-bold text-gray-900 font-['Sora'] group-hover:text-blue-600 transition-colors truncate">Continue Shopping</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-[10px] sm:text-sm bg-green-50 px-2.5 sm:px-3 py-1.5 rounded-full border border-green-100 flex-shrink-0">
             <FaLock className="text-green-600 flex-shrink-0" size={12} />
             <span className="font-medium text-green-700 whitespace-nowrap">Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-6 sm:mt-8">
        <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900 mb-6 sm:mb-8 font-['Sora'] flex items-center gap-2 sm:gap-3">
          <FaShoppingBag className="text-blue-600 flex-shrink-0" size={22} /> Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-12 text-center border border-gray-100 mt-10">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingBag size={28} className="sm:w-[40px]" />
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 font-['Sora']">Your cart is empty</h2>
            <p className="text-gray-500 mb-6 sm:mb-8 max-w-md mx-auto text-xs sm:text-lg">Looks like you haven't added any products to your cart yet. Explore our top categories and find something you love!</p>
            <button 
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm sm:text-lg w-full sm:w-auto"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4 w-full min-w-0">
              {cartItems.map((item) => {
                const itemPrice = getNumericPrice(item.price);
                const itemTotal = itemPrice * item.quantity;
                
                return (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-6 hover:shadow-md transition-shadow w-full">
                    
                    {/* Responsive Image Wrapper */}
                    <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-[#F7FAFC] rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center p-2">
                      <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    
                    {/* Product Details Content */}
                    <div className="flex-grow flex flex-col justify-between text-center sm:text-left w-full min-w-0 gap-3 sm:gap-0">
                      <div>
                        <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 font-['Sora'] break-words line-clamp-2">{item.name}</h3>
                        <p className="text-gray-400 text-[11px] sm:text-sm mb-1 sm:mb-4">Premium Quality Product</p>
                      </div>
                      
                      {/* Controls and Remove Button Row */}
                      <div className="flex flex-row items-center justify-between sm:justify-start gap-4 mt-auto w-full">
                        <div className="flex items-center border border-gray-200 rounded-lg bg-[#F7FAFC] flex-shrink-0 shadow-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-3 sm:px-4 py-1 sm:py-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors rounded-l-lg text-base sm:text-lg font-medium"
                          >
                            -
                          </button>
                          <span className="px-3 sm:px-4 font-semibold text-gray-800 bg-white border-x border-gray-200 py-1 sm:py-1.5 text-xs sm:text-base min-w-[36px] text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 sm:px-4 py-1 sm:py-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors rounded-r-lg text-base sm:text-lg font-medium"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md transition-colors flex items-center gap-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap"
                        >
                          <FaTrash size={12} className="sm:w-[14px]" /> <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Pricing Display */}
                    <div className="text-center sm:text-right flex flex-col justify-center sm:justify-start pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 w-full sm:w-auto sm:min-w-[120px] flex-shrink-0">
                      <p className="text-lg sm:text-2xl font-bold text-gray-900 font-['Sora']">${itemTotal.toFixed(2)}</p>
                      {item.quantity > 1 && <p className="text-[11px] sm:text-sm text-gray-400 mt-0.5 sm:mt-1">${itemPrice.toFixed(2)} each</p>}
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:sticky lg:top-24">
                <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 font-['Sora'] border-b border-gray-100 pb-3 sm:pb-4">Order Summary</h3>
                
                <div className="space-y-3 sm:space-y-4 text-xs sm:text-base text-gray-600 mb-5 sm:mb-6">
                  <div className="flex justify-between items-center">
                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                    <span className="font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Estimated Tax</span>
                    <span className="font-semibold text-gray-900 text-right text-xs sm:text-sm">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3 sm:pt-4 mb-5 sm:mb-6 bg-gray-50 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 sm:py-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-lg font-bold text-gray-900">Total</span>
                    <span className="text-xl sm:text-3xl font-extrabold text-blue-600 font-['Sora']">${finalTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1.5 text-right">Prices include VAT where applicable</p>
                </div>

                {checkoutMessage && (
                  <div className={`mb-4 p-3 rounded-lg text-sm font-medium text-center ${
                    checkoutMessage.includes("✅") 
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : checkoutMessage.includes("❌")
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}>
                    {checkoutMessage}
                  </div>
                )}

                <button 
                  onClick={handleCheckoutClick}
                  disabled={isCheckingOut}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mb-4 text-sm sm:text-lg"
                >
                  <FaCreditCard size={16} /> {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </button>
                
                <div className="flex flex-col items-center justify-center gap-4 mt-5 sm:mt-6 border-t border-gray-100 pt-5 sm:pt-6">
                  <p className="text-xs text-gray-500 font-medium">Guaranteed Safe Checkout</p>
                  <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-4">
  
                    {/* PayPal */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-2.5 py-1.5 sm:px-3 sm:py-2 hover:shadow-md transition">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                        className="h-4 sm:h-6 object-contain"
                        alt="PayPal"
                      />
                    </div>

                    {/* Mastercard */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-2.5 py-1.5 sm:px-3 sm:py-2 hover:shadow-md transition">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                        className="h-4 sm:h-6 object-contain"
                        alt="Mastercard"
                      />
                    </div>

                    {/* Google Pay */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-2.5 py-1.5 sm:px-3 sm:py-2 hover:shadow-md transition flex items-center gap-1.5 sm:gap-2">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
                        className="h-4 sm:h-6 object-contain"
                        alt="Google Pay"
                      />
                      <span className="text-[10px] sm:text-sm font-medium text-gray-700">G Pay</span>
                    </div>

                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-green-600 font-bold mt-0.5">
                    <FaLock size={10} /> 256-bit SSL Encrypted Payment
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Shipping Details Modal */}
      {showShippingModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <div className="p-2.5 bg-white/20 rounded-xl">
                  <FaTruck className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-['Sora']">Shipping Information</h2>
                  <p className="text-xs text-blue-100">Provide details for real-time delivery notifications</p>
                </div>
              </div>
              <button
                onClick={() => setShowShippingModal(false)}
                className="text-white opacity-80 hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/25 p-2 rounded-full"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              {/* Full Name & Email Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <FaUser className="text-blue-500" size={13} /> Full Name
                  </label>
                  <input
                    type="text"
                    value={shippingDetails.name}
                    onChange={(e) => {
                      setShippingDetails({...shippingDetails, name: e.target.value});
                      if (errors.name) setErrors({...errors, name: ""});
                    }}
                    className={`w-full px-4 py-2.5 border rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <FaEnvelope className="text-blue-500" size={13} /> Email Address
                  </label>
                  <input
                    type="email"
                    value={shippingDetails.email}
                    onChange={(e) => {
                      setShippingDetails({...shippingDetails, email: e.target.value});
                      if (errors.email) setErrors({...errors, email: ""});
                    }}
                    className={`w-full px-4 py-2.5 border rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Country Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <FaGlobe className="text-blue-500" size={13} /> Country
                </label>
                <div className="relative">
                  <select
                    value={selectedCountryCode}
                    onChange={handleCountryChange}
                    className={`w-full px-4 py-2.5 bg-white border rounded-xl text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer ${
                      errors.country ? "border-red-500" : "border-gray-200"
                    }`}
                  >
                    <option value="" disabled>Select your country</option>
                    {countriesList.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
                {errors.country && <p className="text-[11px] text-red-500 mt-1">{errors.country}</p>}

                {selectedCountryCode === "OTHER" && (
                  <div className="mt-3">
                    <input
                      type="text"
                      value={customCountry}
                      onChange={(e) => {
                        setCustomCountry(e.target.value);
                        setShippingDetails({ ...shippingDetails, country: e.target.value });
                        if (errors.country) setErrors({ ...errors, country: "" });
                      }}
                      className={`w-full px-4 py-2.5 border rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                        errors.country ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Type country name manually"
                    />
                  </div>
                )}
              </div>

              {/* City & Postal Code Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <FaCity className="text-blue-500" size={13} /> City
                  </label>
                  {selectedCountryCode && countriesList.find(c => c.code === selectedCountryCode)?.cities.length > 0 ? (
                    <div className="relative">
                      <select
                        value={selectedCity}
                        onChange={handleCityChange}
                        className={`w-full px-4 py-2.5 bg-white border rounded-xl text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer ${
                          errors.city ? "border-red-500" : "border-gray-200"
                        }`}
                      >
                        <option value="" disabled>Select City</option>
                        {countriesList.find(c => c.code === selectedCountryCode)?.cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                        <option value="CUSTOM_CITY">Other (Type manually)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={shippingDetails.city}
                      onChange={(e) => {
                        setShippingDetails({...shippingDetails, city: e.target.value});
                        if (errors.city) setErrors({...errors, city: ""});
                      }}
                      className={`w-full px-4 py-2.5 border rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                        errors.city ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Enter city"
                    />
                  )}
                  {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}

                  {selectedCountryCode && countriesList.find(c => c.code === selectedCountryCode)?.cities.length > 0 && selectedCity === "CUSTOM_CITY" && (
                    <div className="mt-3">
                      <input
                        type="text"
                        value={customCity}
                        onChange={(e) => {
                          setCustomCity(e.target.value);
                          setShippingDetails({ ...shippingDetails, city: e.target.value });
                          if (errors.city) setErrors({ ...errors, city: "" });
                        }}
                        className={`w-full px-4 py-2.5 border rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                          errors.city ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="Type city name manually"
                      />
                    </div>
                  )}
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <FaEnvelope className="text-blue-500" size={13} /> Postal Code
                  </label>
                  <input
                    type="text"
                    value={shippingDetails.postalCode}
                    onChange={(e) => {
                      setShippingDetails({...shippingDetails, postalCode: e.target.value});
                      if (errors.postalCode) setErrors({...errors, postalCode: ""});
                    }}
                    className={`w-full px-4 py-2.5 border rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.postalCode ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="e.g., 60000"
                  />
                  {errors.postalCode && <p className="text-[11px] text-red-500 mt-1">{errors.postalCode}</p>}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-blue-500" size={13} /> Street Address
                </label>
                <textarea
                  rows={2}
                  value={shippingDetails.address}
                  onChange={(e) => {
                    setShippingDetails({...shippingDetails, address: e.target.value});
                    if (errors.address) setErrors({...errors, address: ""});
                  }}
                  className={`w-full px-4 py-2.5 border rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none ${
                    errors.address ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Apartment/Suite, Street address, Block"
                />
                {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
              </div>

              {/* Message Bar */}
              {checkoutMessage && (
                <div className={`p-3.5 rounded-xl text-sm font-semibold text-center border transition-all ${
                  checkoutMessage.includes("✅") 
                    ? "bg-green-50 text-green-700 border-green-200" 
                    : checkoutMessage.includes("❌")
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                }`}>
                  {checkoutMessage}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setShowShippingModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isCheckingOut}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Placing Order...</span>
                    </>
                  ) : (
                    <span>Confirm & Place Order</span>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;