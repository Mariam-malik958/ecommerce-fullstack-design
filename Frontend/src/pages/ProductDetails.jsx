import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";


// Sample product database (in real app, fetch from API)
const products = [
  { id: 1, name: "Canon Camera EOS 2000, Black 10x zoom", price: 498.0, originalPrice: 1128.0, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80", rating: 4, reviews: 154, category: "Hot Offers", description: "Professional Canon camera with 10x zoom, perfect for photography enthusiasts. Features advanced autofocus, 4K video recording, and weather-sealed body.", seller: "Canon Official", stock: 25, sku: "CANON-EOS-2000", colors: ["Black", "Silver", "Red"] },
  { id: 2, name: "GoPro HERO6 4K Action Camera", price: 299.0, originalPrice: 598.0, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80", rating: 4, reviews: 154, category: "Hot Offers", description: "Compact 4K action camera with waterproof design. Ideal for adventure and sports content. Touch display, voice control, and advanced stabilization.", seller: "GoPro Store", stock: 45, sku: "GOPRO-HERO6", colors: ["Black", "Blue"] },
  { id: 3, name: "Apple Watch Series 8 - 50% OFF", price: 199.0, originalPrice: 399.0, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80", rating: 5, reviews: 230, category: "Hot Offers", description: "Latest Apple Watch Series 8 with fitness tracking, ECG, and blood oxygen monitoring. Retina display, all-day battery, and water resistant.", seller: "Apple", stock: 60, sku: "WATCH-S8", colors: ["Black", "Silver", "Gold", "Red"] },
  { id: 4, name: "Sony Headphones WH-1000XM5 Deal", price: 198.0, originalPrice: 399.0, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80", rating: 5, reviews: 310, category: "Hot Offers", description: "Premium noise-canceling wireless headphones. 8-hour battery, Bluetooth 5.0, and exceptional sound quality. Industry-leading ANC technology.", seller: "Sony", stock: 38, sku: "SONY-WH1000XM5", colors: ["Black", "White", "Midnight Purple"] },
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [imageIndex, setImageIndex] = useState(0);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="bg-white p-12 rounded-2xl shadow-sm text-center max-w-lg w-full border border-gray-100">
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
      ...product,
      color: selectedColor || "Standard",
      quantity,
      seller: product.seller
    });
    alert("Added to cart!");
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen font-sans text-[#1C1C28] pb-12">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <span>›</span>
            <Link to="/products" className="hover:text-blue-600 transition">Products</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* PRODUCT IMAGES */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-4">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 aspect-square flex items-center justify-center relative group overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  {discount > 0 && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg">
                      -{discount}%
                    </div>
                  )}
                  {product.stock <= 10 && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-lg">
                      Only {product.stock} left!
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {[product.image, product.image, product.image].map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIndex(i)}
                    className={`flex-1 aspect-square rounded-lg border-2 overflow-hidden bg-gray-50 transition ${imageIndex === i ? "border-blue-500 shadow-md" : "border-gray-200"}`}
                  >
                    <img src={img} alt={`view-${i}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-white rounded-xl border border-gray-200 p-3 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
                  <div className="text-xs text-gray-500 font-medium">Authentic</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">24h</div>
                  <div className="text-xs text-gray-500 font-medium">Free Shipping</div>
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="md:col-span-1 lg:col-span-2">
            
            {/* Product Title & Rating */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
              </div>
              
              <div className="flex items-center gap-4 flex-wrap mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} className={`text-lg ${s <= product.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>
                <div className="h-6 w-px bg-gray-200"></div>
                <div className="text-sm text-gray-600 font-medium">SKU: {product.sku}</div>
              </div>

              {/* Seller Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 inline-block mb-4">
                <div className="text-xs text-gray-600">Sold by <span className="font-bold text-blue-600 cursor-pointer hover:underline">{product.seller}</span></div>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
              <div className="flex items-baseline gap-4 mb-4">
                <div className="text-4xl font-extrabold text-gray-900">${product.price.toFixed(2)}</div>
                {product.originalPrice > 0 && (
                  <div className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</div>
                )}
              </div>
              
              {product.originalPrice > 0 && (
                <div className="text-sm text-green-600 font-medium mb-4">
                  ✓ You save ${(product.originalPrice - product.price).toFixed(2)} ({discount}% off)
                </div>
              )}

              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  <span className="font-medium text-green-600">FREE Shipping</span> on orders over $50
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">30-day</span> Returns & Refund Policy
                </p>
              </div>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Choose Color</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`py-3 px-4 rounded-xl border-2 font-medium text-sm transition ${
                        selectedColor === color
                          ? "border-blue-600 bg-blue-50 text-blue-600"
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
              <label className="block text-sm font-semibold text-gray-900 mb-3">Quantity</label>
              <div className="flex gap-4 items-center">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-12 text-gray-600 hover:bg-gray-100 transition flex items-center justify-center"
                  >
                    −
                  </button>
                  <div className="w-16 h-12 flex items-center justify-center border-x border-gray-300 font-semibold text-lg">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-12 text-gray-600 hover:bg-gray-100 transition flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600 flex-1">
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-medium">✓ {product.stock} in stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Out of stock</span>
                  )}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                Add to Cart
              </button>
              <button className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold text-lg hover:border-red-500 hover:text-red-500 transition hover:bg-red-50">
                ❤️ Add to Wishlist
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🛡️</div>
                <div className="text-xs text-gray-700 font-medium">Secure Payment</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🚚</div>
                <div className="text-xs text-gray-700 font-medium">Fast Shipping</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">↩️</div>
                <div className="text-xs text-gray-700 font-medium">Easy Returns</div>
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
                className={`flex-1 px-6 py-4 font-semibold text-sm transition capitalize ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === "description" && (
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>
                <p className="text-gray-600 leading-relaxed">
                  This product is perfect for both professionals and casual users. It comes with warranty support and customer service. Order now and enjoy the best shopping experience!
                </p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-4">Specifications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Brand</span>
                    <span className="font-semibold text-gray-900">Premium Electronics</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Model</span>
                    <span className="font-semibold text-gray-900">Professional Series</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Warranty</span>
                    <span className="font-semibold text-gray-900">2 Years</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Availability</span>
                    <span className="font-semibold text-green-600">In Stock</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {[
                    { name: "John Smith", rating: 5, text: "Excellent product! Exactly as described. Fast shipping." },
                    { name: "Sarah Johnson", rating: 4, text: "Great quality. Minor display issue but works great." },
                    { name: "Mike Brown", rating: 5, text: "Best purchase ever! Highly recommend!" },
                  ].map((review, i) => (
                    <div key={i} className="pb-6 border-b border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900">{review.name}</span>
                        <span className="text-yellow-400">{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</span>
                      </div>
                      <p className="text-gray-600">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}