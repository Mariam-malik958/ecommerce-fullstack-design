import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    stock: "",
    websiteUrl: ""
  });

  const [loading, setLoading] = useState(false);
  const [imageStatus, setImageStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // When user types/pastes an image URL, try to load it
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

    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [formData.image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image.trim()) {
      alert("Please enter an image URL");
      return;
    }

    setLoading(true);
    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
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
        navigate("/admin");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center space-x-4">
          <Link
            to="/admin"
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="e.g. Wireless Headphones"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="29.99"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Furniture">Furniture</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="100"
                />
              </div>
            </div>

            {/* IMAGE URL - accepts ANY link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <div className="flex gap-4 items-start">
                <input
                  type="text"
                  name="image"
                  required
                  value={formData.image}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Paste any image link here..."
                />

                {/* Live Preview Box */}
                {formData.image && (
                  <div className="w-20 h-20 border-2 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
                    style={{
                      borderColor: imageStatus === "success" ? "#22c55e" : imageStatus === "error" ? "#ef4444" : "#d1d5db",
                      background: "#f9fafb"
                    }}
                  >
                    {imageStatus === "loading" && (
                      <div className="flex flex-col items-center">
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-[9px] text-gray-400 mt-1">Loading...</span>
                      </div>
                    )}
                    {imageStatus === "success" && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    {imageStatus === "error" && (
                      <div className="flex flex-col items-center px-1">
                        <span className="text-red-500 text-lg">⚠️</span>
                        <span className="text-[9px] text-red-500 text-center font-medium">Can't load</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Status messages */}
              {imageStatus === "success" && (
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  ✅ Image loaded successfully! This will show on website.
                </p>
              )}
              {imageStatus === "error" && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  ⚠️ Image can't be loaded from this URL. Try using a direct image link (right-click image → "Copy image address").
                </p>
              )}
              {imageStatus === "idle" && (
                <p className="text-xs text-gray-500 mt-1">
                  Paste any image link — from Google, Pinterest, or any website. Right-click the image → "Copy image address" for best results.
                </p>
              )}
              {imageStatus === "loading" && (
                <p className="text-xs text-blue-500 mt-1">
                  🔄 Checking image URL...
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter product description..."
              ></textarea>
              {/* Website URL Input */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                <input
                  type="text"
                  name="websiteUrl"
                  placeholder="https://example.com/product-page"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Enter any external link for this product (optional).</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md disabled:bg-blue-400"
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
