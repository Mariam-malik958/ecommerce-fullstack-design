import React, { useState } from "react";
import {
  FaBars,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaThLarge,
  FaList
} from "react-icons/fa";

const productsData = [
  {
    id: 1,
    name: "Canon Camera EOS 2000, Black 10x zoom",
    price: "$998.00",
    originalPrice: "$1128.00",
    image: "/images/image 33.png",
    rating: 4.5,
    orders: 154,
    category: "Electronics",
    brand: "Samsung",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."
  },
  {
    id: 2,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: "$998.00",
    originalPrice: "$1128.00",
    image: "/images/image 23.png",
    rating: 4.5,
    orders: 154,
    category: "Electronics",
    brand: "Apple",
    description: "UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 3,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: "$998.00",
    originalPrice: "$1128.00",
    image: "/images/image 32.png",
    rating: 4.5,
    orders: 154,
    category: "Mobile accessory",
    brand: "Huawei",
    description: "UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 4,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: "$998.00",
    originalPrice: "$1128.00",
    image: "/images/image 34.png",
    rating: 4.5,
    orders: 154,
    category: "Smartphones",
    brand: "Pocco",
    description: "UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 5,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: "$998.00",
    originalPrice: "$1128.00",
    image: "/images/watch.png",
    rating: 4.5,
    orders: 154,
    category: "Modern tech",
    brand: "Lenovo",
    description: "UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 6,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: "$998.00",
    originalPrice: "$1128.00",
    image: "/images/image 86.png",
    rating: 4.5,
    orders: 154,
    category: "Mobile accessory",
    brand: "Samsung",
    description: "UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
];

export default function WebGridView() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Handle Brand Filter
  const handleBrandClick = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Reset Filters
  const clearAllFilters = () => {
    setSelectedCategory("");
    setSelectedBrands([]);
  };

  // ─── CHECK IF FILTER IS ACTIVE ───
  const isFilterActive = selectedCategory !== "" || selectedBrands.length > 0;

  // Filter Products Logic
  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return matchesCategory && matchesBrand;
  });

  return (
    <div className="bg-[#F7FAFC] min-h-screen text-gray-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-10 py-3 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={clearAllFilters}>
            <div className="bg-blue-500 p-2 rounded text-white font-bold text-lg">B</div>
            <span className="text-blue-600 text-2xl font-bold tracking-tight">Brand</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-[600px] border-2 border-blue-500 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search for products..."
              className="px-4 py-2 w-full outline-none text-sm"
            />
            <select className="border-l bg-white px-3 text-sm text-gray-600 outline-none cursor-pointer">
              <option>All category</option>
            </select>
            <button className="bg-blue-500 px-6 text-white text-sm font-semibold hover:bg-blue-600">
              Search
            </button>
          </div>

          {/* Nav Icons */}
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex flex-col items-center cursor-pointer hover:text-blue-500">
              <FaUser size={18} />
              <span className="text-[10px] mt-1">Profile</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:text-blue-500">
              <FaHeart size={18} />
              <span className="text-[10px] mt-1">Orders</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:text-blue-500 relative">
              <FaShoppingCart size={18} />
              <span className="text-[10px] mt-1">My Cart</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div>
          </div>

        </div>

        {/* NAVBAR */}
        <div className="border-t border-gray-100 hidden sm:block">
          <div className="container mx-auto px-4 lg:px-10 py-2.5 flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 font-semibold cursor-pointer text-gray-900" onClick={clearAllFilters}>
                <FaBars size={14} />
                All category
              </div>
              <span className="cursor-pointer hover:text-blue-500">Hot offers</span>
              <span className="cursor-pointer hover:text-blue-500">Gift boxes</span>
              <span className="cursor-pointer hover:text-blue-500">Projects</span>
              <span className="cursor-pointer hover:text-blue-500">Menu item</span>
            </div>
          </div>
        </div>
      </div>

      {/* BREADCRUMB */}
      <div className="container mx-auto px-4 lg:px-10 py-3 text-xs text-gray-400 flex gap-2">
        <span className="text-blue-500 cursor-pointer" onClick={clearAllFilters}>Home</span> &rsaquo;
        <span>Electronics</span> &rsaquo;
        <span className="text-gray-600 font-medium">Grid View</span>
      </div>

      {/* MAIN BODY CONTAINER */}
      <div className="container mx-auto px-4 lg:px-10 py-4">
        
        {/* TOP FILTER METADATA */}
        <div className="flex justify-between items-center mb-4 bg-white border border-gray-200 p-3 rounded-lg">
          <div className="text-sm font-medium">
            {filteredProducts.length} items found in{" "}
            <span className="text-blue-600 font-bold">{selectedCategory || "All Categories"}</span>
          </div>
          <div className="flex items-center gap-3">
            <select className="border border-gray-200 bg-white rounded px-3 py-1 text-xs outline-none cursor-pointer">
              <option>Featured</option>
              <option>Price: Low to High</option>
            </select>
            <div className="flex border border-gray-200 rounded overflow-hidden">
              <button 
                className={`p-2 text-xs ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                onClick={() => setViewMode("grid")}
              >
                <FaThLarge />
              </button>
              <button 
                className={`p-2 text-xs ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                onClick={() => setViewMode("list")}
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>

        {/* SIDEBAR & GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* SIDEBAR FILTERS */}
          <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-4 h-fit space-y-5 shadow-sm">
            
            {/* Category Section */}
            <div>
              <h3 className="font-bold text-sm tracking-wide uppercase text-gray-900 mb-2.5 flex justify-between">
                Category <span>⌄</span>
              </h3>
              <div className="space-y-2 text-xs text-gray-600">
                {["Mobile accessory", "Electronics", "Smartphones", "Modern tech"].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
                    <input 
                      type="radio" 
                      name="sidebar-cat" 
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="accent-blue-500"
                    />
                    <span className={selectedCategory === cat ? "text-blue-600 font-semibold" : ""}>{cat}</span>
                  </label>
                ))}
                {selectedCategory && (
                  <span className="text-blue-500 text-[11px] font-semibold cursor-pointer block mt-1" onClick={() => setSelectedCategory("")}>
                    Clear Category
                  </span>
                )}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Brands Section */}
            <div>
              <h3 className="font-bold text-sm tracking-wide uppercase text-gray-900 mb-2.5 flex justify-between">
                Brands <span>⌄</span>
              </h3>
              <div className="space-y-2 text-xs text-gray-600">
                {["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"].map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
                    <input 
                      type="checkbox" 
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandClick(brand)}
                      className="accent-blue-500 rounded"
                    />
                    <span className={selectedBrands.includes(brand) ? "text-blue-600 font-semibold" : ""}>{brand}</span>
                  </label>
                ))}
                {selectedBrands.length > 0 && (
                  <span className="text-blue-500 text-[11px] font-semibold cursor-pointer block mt-1" onClick={() => setSelectedBrands([])}>
                    Clear Brands
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* PRODUCT CARDS VIEW DISPLAY AREA */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border rounded-lg p-16 text-center text-gray-400 font-medium shadow-sm">
                No products found matching those filters.
              </div>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
                : "flex flex-col gap-4"
              }>
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id}
                    className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:border-blue-200 transition-all relative flex ${
                      viewMode === "grid" ? "flex-col justify-between" : "flex-row gap-5 items-center"
                    }`}
                  >
                    
                    {/* Image Box */}
                    <div className={`flex items-center justify-center bg-gray-50 rounded-md overflow-hidden flex-shrink-0 ${
                      viewMode === "grid" ? "w-full h-[180px] mb-3" : "w-[130px] h-[130px]"
                    }`}>
                      <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain p-2" />
                    </div>

                    {/* Content Box */}
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-900 font-bold text-base md:text-lg mb-1">
                        {product.price} <span className="text-xs text-gray-400 font-normal line-through ml-1.5">{product.originalPrice}</span>
                      </div>

                      {/* ─── CONDITION: HIDE RATING IF CATEGORY OR BRAND IS SELECTED ─── */}
                      {!isFilterActive && (
                        <div className="flex items-center gap-1 text-amber-400 text-xs my-1.5">
                          <div className="flex"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                          <span className="text-gray-400 text-[11px] font-normal ml-1">• {product.orders} orders</span>
                        </div>
                      )}

                      <h4 className="text-gray-700 text-sm font-medium hover:text-blue-500 cursor-pointer line-clamp-2 leading-tight">
                        {product.name}
                      </h4>
                      
                      {viewMode === "list" && (
                        <p className="text-xs text-gray-400 mt-2 max-w-[500px] line-clamp-2">{product.description}</p>
                      )}
                    </div>

                    {/* Heart Option Absolute Icon for Grid Mode */}
                    <button className="absolute top-4 right-4 text-gray-300 hover:text-red-500 border border-gray-100 p-2 rounded-md hover:bg-red-50 bg-white transition-colors">
                      <FaHeart size={14} />
                    </button>

                  </div>
                ))}
              </div>
            )}

            {/* PAGINATION BAR */}
            <div className="flex justify-end gap-1.5 mt-6">
              <button className="border border-gray-200 px-3 py-1.5 bg-white text-xs font-semibold rounded hover:bg-gray-50">1</button>
              <button className="border border-gray-200 px-3 py-1.5 bg-white text-xs font-semibold rounded hover:bg-gray-50">2</button>
              <button className="border border-gray-200 px-3 py-1.5 bg-white text-xs font-semibold rounded hover:bg-gray-50">&rsaquo;</button>
            </div>
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-8 text-sm text-gray-500">
        <div className="container mx-auto px-4 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h5 className="font-bold text-gray-900 mb-2">About</h5>
            <p className="cursor-pointer hover:text-blue-500 text-xs">About us</p>
            <p className="cursor-pointer hover:text-blue-500 text-xs mt-1">Find Store</p>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 mb-2">Information</h5>
            <p className="cursor-pointer hover:text-blue-500 text-xs">Help Center</p>
            <p className="cursor-pointer hover:text-blue-500 text-xs mt-1">Money Refund</p>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 mb-2">For Users</h5>
            <p className="cursor-pointer hover:text-blue-500 text-xs">Login</p>
            <p className="cursor-pointer hover:text-blue-500 text-xs mt-1">Register</p>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 mb-2">Brand Office</h5>
            <p className="text-xs">© 2026 Brand Ecommerce, Inc.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}