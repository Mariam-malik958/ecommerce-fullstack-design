import React from "react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaArrowLeft, FaCreditCard, FaLock, FaShoppingBag } from "react-icons/fa";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  // Helper to get numeric price safely for display
  const getNumericPrice = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  const discount = cartItems.length > 0 ? 10 : 0;
  const finalTotal = Math.max(0, totalPrice - discount);

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
          <FaShoppingBag className="text-blue-600 flex-shrink-0" size={22} className="sm:w-[28px]" /> Your Shopping Cart
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

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mb-4 text-sm sm:text-lg">
                  <FaCreditCard size={16} /> Proceed to Checkout
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
    </div>
  );
};

export default Cart;