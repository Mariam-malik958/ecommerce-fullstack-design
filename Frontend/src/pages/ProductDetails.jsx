import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

// Sample initial products database (fallback)
const fallbackProducts = [
  { id: 1, name: "Canon Camera EOS 2000, Black 10x zoom", price: 498.0, originalPrice: 1128.0, image: "/images/image 33.png", rating: 4, reviews: 154, category: "Hot Offers", description: "Professional Canon camera with 10x zoom, perfect for photography enthusiasts. Features advanced autofocus, 4K video recording, and weather-sealed body.", seller: "Canon Official", stock: 25, sku: "CANON-EOS-2000", colors: ["Black", "Silver", "Red"] },
  { id: 2, name: "GoPro HERO6 4K Action Camera", price: 299.0, originalPrice: 598.0, image: "/images/image 23.png", rating: 4, reviews: 154, category: "Hot Offers", description: "Compact 4K action camera with waterproof design. Ideal for adventure and sports content. Touch display, voice control, and advanced stabilization.", seller: "GoPro Store", stock: 45, sku: "GOPRO-HERO6", colors: ["Black", "Blue"] },
  { id: 3, name: "Apple Watch Series 8 - 50% OFF", price: 199.0, originalPrice: 399.0, image: "/images/watch.png", rating: 5, reviews: 230, category: "Hot Offers", description: "Latest Apple Watch Series 8 with fitness tracking, ECG, and blood oxygen monitoring. Retina display, all-day battery, and water resistant.", seller: "Apple", stock: 60, sku: "WATCH-S8", colors: ["Black", "Silver", "Gold", "Red"] },
  { id: 4, name: "Sony Headphones WH-1000XM5 Deal", price: 198.0, originalPrice: 399.0, image: "/images/image 29.png", rating: 5, reviews: 310, category: "Hot Offers", description: "Premium noise-canceling wireless headphones. 8-hour battery, Bluetooth 5.0, and exceptional sound quality. Industry-leading ANC technology.", seller: "Sony", stock: 38, sku: "SONY-WH1000XM5", colors: ["Black", "White", "Midnight Purple"] },
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [imageIndex, setImageIndex] = useState(0);
const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
  const loadProduct = async () => {
    setLoading(true);
    const localId = parseInt(id);
    // First, try to find in fallback products (hardcoded)
    const foundLocal = fallbackProducts.find(p => p.id === localId);
    if (foundLocal) {
      setProduct(foundLocal);
      setLoading(false);
      return;
    }
    // If not found locally, fetch from backend API
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        const mappedProduct = {
          id: data._id,
          name: data.name,
          price: data.price,
          originalPrice: data.price * 1.2,
          image: data.image,
          rating: 4.5,
          reviews: 120,
          category: data.category || "General",
          description: data.description,
          websiteUrl: data.websiteUrl,
          seller: "Official Supplier",
          stock: data.stock || 0,
          sku: `PROD-${data._id.slice(-6).toUpperCase()}`,
          colors: ["Black", "Silver"]
        };
        setProduct(mappedProduct);
      } else {
        // If backend returns not found, try fallback again (in case id is numeric string)
        const fallback = fallbackProducts.find(p => p.id === parseInt(id));
        if (fallback) setProduct(fallback);
        else setProduct(null);
      }
    } catch (error) {
      console.error("Error loading product detail:", error);
      // On error, also try fallback
      const fallback = fallbackProducts.find(p => p.id === parseInt(id));
      if (fallback) setProduct(fallback);
      else setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  loadProduct();
}, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-gray-500 font-semibold">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="bg-white p-12 rounded-2xl shadow-sm text-center max-w-lg w-full border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Product not found</h2>
          <p className="text-gray-500 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate("/products")} className="w-full bg-[#0D6EFD] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice > 0 ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    if (!selectedColor && product.colors.length > 0) {
      alert("Please select a color");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor || "Standard",
      quantity,
      seller: product.seller
    });
    alert("Added to cart!");
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen font-sans text-[#1C1C28] pb-12" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Tailwind Import for Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition font-medium">Home</Link>
            <span>›</span>
            <Link to="/products" className="hover:text-blue-600 transition font-medium">Products</Link>
            <span>›</span>
            <span className="text-gray-950 font-semibold truncate max-w-xs sm:max-w-md">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* PRODUCT IMAGES */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-4 p-4">
                <div className="bg-white aspect-square flex items-center justify-center relative group overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => setShowImageModal(true)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80";
                    }}
                  />
                  {discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow">
                      -{discount}%
                    </div>
                  )}
                  {product.stock <= 10 && product.stock > 0 && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-2.5 py-1 rounded-full font-bold text-[10px] shadow">
                      Only {product.stock} left!
                    </div>
                  )}
                </div>
{showImageModal && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setShowImageModal(false)}>
    <img src={product.image} alt={product.name} className="max-w-3xl max-h-[80vh] object-contain" />
  </div>
)}
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-4 text-center shadow-sm">
                  <div className="text-xl font-black text-green-600 mb-1">100%</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Authentic</div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-4 text-center shadow-sm">
                  <div className="text-xl font-black text-blue-600 mb-1">24h</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Free Shipping</div>
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="lg:col-span-7">
            
            {/* Product Title & Rating */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-3">{product.name}</h1>
              
              <div className="flex items-center gap-4 flex-wrap mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-yellow-400 font-bold text-lg">
                    ★ ★ ★ ★ ★
                  </div>
                  <span className="text-sm font-bold text-gray-800">{product.rating}</span>
                  <span className="text-sm text-gray-400 font-medium">({product.reviews} reviews)</span>
                </div>
                <div className="h-4 w-px bg-gray-200"></div>
                <div className="text-xs text-gray-500 font-bold tracking-wider">SKU: {product.sku}</div>
              </div>

              {/* Seller Info */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-2 inline-block">
                <div className="text-xs text-slate-600 font-medium">Sold by <span className="font-bold text-blue-600 cursor-pointer hover:underline">{product.seller}</span></div>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
              <div className="flex items-baseline gap-4 mb-3">
                <div className="text-4xl font-black text-slate-900">${product.price?.toFixed(2)}</div>
                {product.originalPrice > 0 && (
                  <div className="text-xl text-gray-400 line-through font-medium">${product.originalPrice?.toFixed(2)}</div>
                )}
              </div>
              
              {product.originalPrice > 0 && (
                <div className="text-xs text-green-600 font-bold mb-4 bg-green-50 border border-green-150 rounded-lg px-3 py-1.5 inline-block">
                  ✓ You save ${(product.originalPrice - product.price)?.toFixed(2)} ({discount}% off)
                </div>
              )}

              <div className="space-y-2 text-sm border-t border-gray-150 pt-4 mt-2">
                <p className="text-gray-600 flex items-center gap-2">
                  <span className="text-green-600 font-bold">●</span> <span className="font-medium text-green-600">FREE Shipping</span> on orders over $50
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <span className="text-blue-500 font-bold">●</span> <span className="font-medium">30-day</span> Returns & Refund Policy
                </p>
              </div>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Choose Color</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`py-3 px-4 rounded-xl border-2 font-bold text-xs transition ${
                        selectedColor === color
                          ? "border-blue-600 bg-blue-50/60 text-blue-600"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Quantity</label>
              <div className="flex gap-4 items-center">
                <div className="flex items-center border border-gray-355 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 text-gray-600 hover:bg-gray-100 transition flex items-center justify-center font-bold text-lg"
                  >
                    −
                  </button>
                  <div className="w-14 h-11 flex items-center justify-center border-x border-gray-200 font-bold text-base text-slate-800">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-11 text-gray-600 hover:bg-gray-100 transition flex items-center justify-center font-bold text-lg"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-600 flex-1">
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-bold flex items-center gap-1">✓ {product.stock} items left in stock</span>
                  ) : (
                    <span className="text-red-600 font-bold">Out of stock</span>
                  )}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow shadow-blue-600/15"
              >
                Add to Cart
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1.5">🛡️</div>
                <div className="text-[10px] text-orange-700 font-bold uppercase tracking-wider">Secure Payment</div>
              </div>
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1.5">🚚</div>
                <div className="text-[10px] text-blue-700 font-bold uppercase tracking-wider">Fast Shipping</div>
              </div>
              <div className="bg-green-50/50 border border-green-100 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1.5">↩️</div>
                <div className="text-[10px] text-green-700 font-bold uppercase tracking-wider">Easy Returns</div>
              </div>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {["description", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-bold text-xs uppercase tracking-widest transition ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/35"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === "description" && (
              <div className="animate-fadeIn">
                <h3 className="font-extrabold text-base text-gray-900 uppercase tracking-widest mb-4">Product Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  This product is perfect for both professionals and casual users. It comes with warranty support and customer service. Order now and enjoy the best shopping experience!
                </p>
                {product.websiteUrl && (
                  <div className="mt-4">
                    <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Visit product website
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="animate-fadeIn">
                <h3 className="font-extrabold text-base text-gray-900 uppercase tracking-widest mb-4">Specifications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-550 text-sm">Brand Category</span>
                    <span className="font-semibold text-gray-900 text-sm">{product.category}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-550 text-sm">Stock Availability</span>
                    <span className="font-semibold text-emerald-600 text-sm">{product.stock > 0 ? "In Stock" : "Out Of Stock"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-550 text-sm">Warranty support</span>
                    <span className="font-semibold text-gray-900 text-sm">2 Years Corporate</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-550 text-sm">Original Sku</span>
                    <span className="font-semibold text-gray-900 text-sm">{product.sku}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="animate-fadeIn">
                <h3 className="font-extrabold text-base text-gray-900 uppercase tracking-widest mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {[
                    { name: "John Smith", rating: 5, text: "Excellent product! Exactly as described. Fast shipping." },
                    { name: "Sarah Johnson", rating: 4, text: "Great quality. Minor display issue but works great." },
                    { name: "Mike Brown", rating: 5, text: "Best purchase ever! Highly recommend!" },
                  ].map((review, i) => (
                    <div key={i} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-gray-950 text-sm">{review.name}</span>
                        <span className="text-yellow-400 text-sm">{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Dynamic Keyframes Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease forwards;
        }
      `}</style>
    </div>
  );
}