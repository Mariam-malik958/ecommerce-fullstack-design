import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaShoppingCart, FaBars, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { useCart } from "../context/CartContext.jsx";
import { useUser } from "../context/UserContext.jsx";

const categories = [
  "Automobiles",
  "Clothes and wear",
  "Home interiors",
  "Computer and tech",
  "Tools, equipments",
  "Sports and outdoor",
  "Animal and pets",
  "Machinery tools",
  "Gift boxes",
  "More category",
];

const categoryDummyPictures = {
  "Automobiles": [
    { id: "cat-auto-1", name: "Sports Car Pro", price: "$45,000", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=150&q=80" },
    { id: "cat-auto-2", name: "Family SUV", price: "$32,500", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=150&q=80" }
  ],
  "Clothes and wear": [
    { id: "cat-cloth-1", name: "Denim Jacket", price: "$45.00", img: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=150&q=80" },
    { id: "cat-cloth-2", name: "Casual T-Shirt", price: "$18.99", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=150&q=80" }
  ],
  "Home interiors": [
    { id: "cat-home-1", name: "Luxury Sofa", price: "$499.00", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=150&q=80" },
    { id: "cat-home-2", name: "Modern Lamp", price: "$35.00", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=150&q=80" }
  ],
  "Computer and tech": [
    { id: "cat-tech-1", name: "Gaming Keyboard", price: "$65.00", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=150&q=80" },
    { id: "cat-tech-2", name: "4K Monitor", price: "$349.99", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=150&q=80" }
  ],
  "Tools, equipments": [
    { id: "cat-tool-1", name: "Power Drill Set", price: "$79.99", img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=150&q=80" }
  ],
  "Sports and outdoor": [
    { id: "cat-sport-1", name: "Camping Tent", price: "$110.00", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=150&q=80" }
  ],
  "Animal and pets": [
    { id: "cat-pet-1", name: "Dog Food Pack", price: "$35.00", img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=150&q=80" }
  ],
  "Machinery tools": [
    { id: "cat-mach-1", name: "Air Compressor", price: "$850.00", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=150&q=80" }
  ],
  "Gift boxes": [
    { id: "cat-gift-1", name: "Executive Office Pack", price: "$45.00", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=150&q=80" },
    { id: "cat-gift-2", name: "Smart Power Bank 20K", price: "$39.99", img: "https://images.unsplash.com/photo-1620283085439-39620a1e21c4?auto=format&fit=crop&w=150&q=80" }
  ],
  "More category": [
    { id: "cat-more-1", name: "Smart phone", price: "$299.00", img: "/images/image 32.png" },
    { id: "cat-more-2", name: "Wireless Headphones", price: "$49.99", img: "/images/image 29.png" },
    { id: "cat-more-3", name: "Modern Blender", price: "$39.00", img: "/images/blender.png" }
  ]
};

const products = [
  { id: "deal-1", name: "Smart watches", image: "/images/watch.png", discount: "-25%", price: "$75.00" },
  { id: "deal-2", name: "Laptops", image: "/images/image 34.png", discount: "-15%", price: "$450.00" },
  { id: "deal-3", name: "GoPro cameras", image: "/images/camera.png", discount: "-40%", price: "$180.00" },
  { id: "deal-4", name: "Headphones", image: "/images/image 29.png", discount: "-25%", price: "$29.99" },
  { id: "deal-5", name: "Canon cameras", image: "/images/image 23.png", discount: "-25%", price: "$320.00" },
];

const homeOutdoorItems = [
  { id: "home-1", name: "Soft chairs", price: "$19.00", img: "/images/1.png" },
  { id: "home-2", name: "Sofa & chair", price: "$19.00", img: "/images/camera.png" },
  { id: "home-3", name: "Kitchen dishes", price: "$19.00", img: "/images/image 93.png" },
  { id: "home-4", name: "Smart watches", price: "$19.00", img: "/images/image 90.png" },
  { id: "home-5", name: "Kitchen mixer", price: "$100.00", img: "/images/9.png" },
  { id: "home-6", name: "Blenders", price: "$39.00", img: "/images/blender.png" },
  { id: "home-7", name: "Home appliance", price: "$19.00", img: "/images/7.png" },
  { id: "home-8", name: "Coffee maker", price: "$10.00", img: "/images/image 89.png" },
];

const electronicsItems = [
  { id: "elec-1", name: "Smart watches", price: "$19.00", img: "/images/watch.png" },
  { id: "elec-2", name: "Cameras", price: "$89.00", img: "/images/camera.png" },
  { id: "elec-3", name: "Headphones", price: "$70.00", img: "/images/image 86.png" },
  { id: "elec-4", name: "Smart watches", price: "$90.00", img: "/images/image 85.png" },
  { id: "elec-5", name: "Gaming set", price: "$35.00", img: "/images/image 29.png" },
  { id: "elec-6", name: "Laptops & PC", price: "$340.00", img: "/images/image 34.png" },
  { id: "elec-7", name: "Smartphones", price: "$19.00", img: "/images/image 32.png" },
  { id: "elec-8", name: "Electric kettle", price: "$240.00", img: "/images/image 33.png" },
];

const recommended = [
  { id: 1, name: "T-shirts with multiple colors, for men", price: "$10.30", image: "/images/Bitmap.png" },
  { id: 2, name: "Jeans shorts for men blue color", price: "$10.30", image: "/images/2.png" },
  { id: 3, name: "Brown winter coat medium size", price: "$12.50", image: "/images/image 30.png" },
  { id: 4, name: "Leather wallet", price: "$34.00", image: "/images/image 24.png" },
  { id: 5, name: "Jeans bag for travel for men", price: "$99.00", image: "/images/image 26.png" },
  { id: 6, name: "blue short jeans", price: "$9.99", image: "/images/5.png" },
  { id: 7, name: "Headset for gaming with mic", price: "$8.99", image: "/images/image 29.png" },
  { id: 8, name: "Smartwatch silver color modern", price: "$10.30", image: "/images/watch.png" },
  { id: 9, name: "Blue wallet for men leather material", price: "$10.30", image: "/images/image 90.png" },
  { id: 10, name: "Jeans bag for travel for men", price: "$80.95", image: "/images/image 85.png" },
];

const services = [
  { label: "Source from Industry Hubs", img: "/images/Mask group.png", fallback: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80", icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" stroke="#0D6EFD" strokeWidth="1.5" fill="none"/><path d="M21 21L17.5 17.5" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round"/></svg>) },
  { label: "Customize Your Products", img: "/images/11.png", fallback: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=400&q=80", icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9V7.5C6 6.67 6.67 6 7.5 6H16.5C17.33 6 18 6.67 18 7.5V9M6 9V19.5C6 20.33 6.67 21 7.5 21H16.5C17.33 21 18 20.33 18 19.5V9M6 9H18" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 12V18" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round"/><path d="M14 12V18" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round"/></svg>) },
  { label: "Fast, reliable shipping by ocean or air", img: "/images/image 106.png", fallback: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80", icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11L12 3L21 11V18C21 19.1 20.1 20 19 20H5C3.9 20 3 19.1 3 18V11Z" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 3V8H20" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round"/><path d="M9 16H15" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round"/></svg>) },
  { label: "Product monitoring and inspection", img: "/images/image 107.png", fallback: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=400&q=80", icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="#0D6EFD" strokeWidth="1.5" fill="none"/><path d="M12 6V12L16 14.5" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
];

const suppliers = [
  { country: "Arabic Emirates", flag: "/images/AE@2x.png", site: "shopname.ae" },
  { country: "Australia", flag: "/images/icon.png", site: "shopname.au" },
  { country: "United States", flag: "/images/US.png", site: "shopname.us" },
  { country: "Russia", flag: "/images/RU@2x.png", site: "shopname.ru" },
  { country: "Italy", flag: "/images/IT@2x.png", site: "shopname.it" },
  { country: "Denmark", flag: "/images/DK@2x.png", site: "denmark.com.uk" },
  { country: "France", flag: "/images/FR@2x.png", site: "shopname.com.fr" },
  { country: "China", flag: "/images/CN@2x.png", site: "shopname.cn" },
  { country: "Germany", flag: "/images/DE@2x.png", site: "shopname.de" },
  { country: "Great Britain", flag: "/images/GB@2x.png", site: "shopname.co.uk" },
];

const LANGUAGES = [
  { flag: "🇺🇸", text: "English, USD" },
  { flag: "🇩🇪", text: "Deutsch, EUR" },
  { flag: "🇵🇰", text: "Urdu, PKR" },
  { flag: "🇦🇪", text: "Arabic, AED" },
];

const COUNTRIES = [
  { name: "Germany",  flag: "https://flagcdn.com/w20/de.png" },
  { name: "USA",      flag: "https://flagcdn.com/w20/us.png" },
  { name: "UK",       flag: "https://flagcdn.com/w20/gb.png" },
  { name: "Pakistan", flag: "https://flagcdn.com/w20/pk.png" },
  { name: "UAE",      flag: "https://flagcdn.com/w20/ae.png" },
];

const FOOTER_LANGUAGES = [
  { name: "English", flag: "https://flagcdn.com/w20/us.png" },
  { name: "Deutsch", flag: "https://flagcdn.com/w20/de.png" },
  { name: "Urdu", flag: "https://flagcdn.com/w20/pk.png" },
  { name: "Arabic", flag: "https://flagcdn.com/w20/ae.png" },
  { name: "Français", flag: "https://flagcdn.com/w20/fr.png" }
];

const INITIAL_SECONDS = 4 * 86400 + 13 * 3600 + 34 * 60 + 56;

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All category");
  const [activeCategory, setActiveCategory] = useState(null);
  const [notification, setNotification] = useState("");
  const [ordersCount, setOrdersCount] = useState(0);

  const navigate = useNavigate();
  const { addToCart, cartItems = [] } = useCart();
  const { user, logout } = useUser();

  // Fetch all products for searching
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        const mapped = data.map(p => ({
          ...p,
          id: p._id,
          originalPrice: p.price * 1.2,
          rating: 4.5,
          orders: p.stock > 0 ? 154 : 0,
          verified: true,
          shipping: "Free Shipping",
          brand: "Generic",
        }));
        setAllProducts(mapped);
      } catch (e) {
        console.error("Error fetching products", e);
      }
    };
    fetchAllProducts();
  }, []);

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setShowResults(false);
      return;
    }
    const results = allProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(trimmed.toLowerCase());
      const matchesCategory = searchCategory === "All category" || p.category === searchCategory;
      return matchesSearch && matchesCategory;
    });
    setSearchResults(results);
    setShowResults(true);
  };

  const resetToHome = () => {
    setSearchQuery("");
    setSearchCategory("All category");
    setShowResults(false);
    setSearchResults([]);
  };

  const [openCategoryItems, setOpenCategoryItems] = useState(null);
  const [activeMenuTab, setActiveMenuTab] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchOrdersCount = async () => {
        try {
          const token = localStorage.getItem("authToken");
          const response = await fetch("http://localhost:5000/api/orders/user/my-orders", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setOrdersCount(data.length);
          }
        } catch (error) {
          console.error("Error fetching order count:", error);
        }
      };
      fetchOrdersCount();
    } else {
      setOrdersCount(0);
    }
  }, [user]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [shipOpen, setShipOpen] = useState(false);
  const [footerLangOpen, setFooterLangOpen] = useState(false);
  
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [footerLang, setFooterLang] = useState({ name: "English", flag: "https://flagcdn.com/w20/us.png" });

  const [timeLeft, setTimeLeft] = useState(INITIAL_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const close = () => { 
      setLangOpen(false); 
      setShipOpen(false); 
      setFooterLangOpen(false); 
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2000);
  };

  const pad = (n) => String(n).padStart(2, "0");
  const days  = pad(Math.floor(timeLeft / 86400));
  const hours = pad(Math.floor((timeLeft % 86400) / 3600));
  const mins  = pad(Math.floor((timeLeft % 3600) / 60));
  const secs  = pad(timeLeft % 60);

  const handleMenuClick = (item) => {
    showNotification(`Clicked: ${item}`);
    if (item.includes("Help")) {
      setActiveMenuTab(activeMenuTab === "Help" ? null : "Help");
    } else {
      setActiveMenuTab(activeMenuTab === item ? null : item);
    }
  };

  const handleSidebarCategoryToggle = (index, category) => {
    setActiveCategory(index);
    if (openCategoryItems === category) {
      setOpenCategoryItems(null);
    } else {
      setOpenCategoryItems(category);
    }
  };

  const handleProductClick = (product) => showNotification(`🔍 Viewing: ${product.name}`);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    const cleanPrice = typeof product.price === 'number' ? product.price : parseFloat(String(product.price).replace(/[^0-9.-]+/g, ""));
    addToCart({ 
      id: product.id || product._id, 
      name: product.name, 
      price: cleanPrice || 0, 
      image: product.image || product.img 
    });
    showNotification(`🛒 ${product.name} added to cart!`);
  };

  const handleImgError = (e, fallback) => { e.target.onerror = null; e.target.src = fallback; };

  const recFallbacks = [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=500&q=80",
  ];

  return (
    <div className="bg-[#F7FAFC] min-h-screen text-[#333]" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        
        .notification { position: fixed; top: 20px; right: 20px; background: #0D6EFD; color: white; padding: 14px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(13,110,253,.3); animation: slideIn .3s ease; z-index: 9999; font-weight: 600; font-size: 14px; }
        @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

        .sidebar-item { padding: 12px 16px; cursor: pointer; font-size: 14px; border-radius: 6px; transition: .2s; display: flex; justify-content: space-between; align-items: center; }
        .sidebar-item:hover { background: #E8F1FF; color: #0D6EFD; }
        .sidebar-item.active { color: #0D6EFD; font-weight: 600; background: #E8F1FF; }

        .deal-card { position: relative; overflow: hidden; background: white; transition: all 0.3s ease; }
        .deal-cart-btn { background: #0D6EFD; color: white; border: none; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: absolute; bottom: 12px; right: 12px; cursor: pointer; opacity: 0; transform: translateY(10px); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .deal-card:hover .deal-cart-btn, .deal-card:active .deal-cart-btn { opacity: 1; transform: translateY(0); }

        .grid-product-card { position: relative; overflow: hidden; display: flex; flex-direction: row; justify-content: space-between; align-items: center; gap: 8px; cursor: pointer; transition: background 0.2s ease; }
        @media (max-width: 639px) { .grid-product-card { flex-direction: column-reverse; justify-content: flex-end; align-items: flex-start; text-align: left; padding: 12px !important; } }
        .grid-product-card:hover { background-color: #F8FAFC; }
        .grid-cart-trigger { opacity: 0; transform: translateY(8px); transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
        .grid-product-card:hover .grid-cart-trigger, .grid-product-card:active .grid-cart-trigger { opacity: 1; transform: translateY(0); }
        @media (max-width: 767px) { .grid-cart-trigger { opacity: 1; transform: translateY(0); } }

        .product-card { background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 14px; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); cursor: pointer; display: flex; flex-direction: column; justify-content: space-between; position: relative; }
        .product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,.08); border-color: #0D6EFD; }
        .hover-cart-btn { width: 100%; background: #0D6EFD; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.25s ease; display: flex; align-items: center; justify-content: center; gap: 6px; opacity: 0; transform: translateY(10px); }
        .product-card:hover .hover-cart-btn, .product-card:active .hover-cart-btn { opacity: 1; transform: translateY(0); }

        .service-card { background: white; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; height: 100%; }
        .service-card:hover { box-shadow: 0 8px 24px rgba(13, 110, 253, 0.15); transform: translateY(-4px); border-color: #0D6EFD; }
        .service-card:hover .service-icon { background: #0D6EFD; }
        .service-card:hover .service-icon svg circle, .service-card:hover .service-icon svg path { stroke: white; fill: white; }

        .tm-dd-wrap { position: relative; }
        .tm-dd-trigger {
          cursor: pointer;
          padding: 5px 8px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: #606060;
          white-space: nowrap;
          transition: background .15s, color .15s;
          user-select: none;
        }
        .tm-dd-trigger:hover { background: #EEF4FF; color: #0D6EFD; }
        .tm-dd-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,.10);
          z-index: 999;
          min-width: 170px;
          overflow: hidden;
        }
        .tm-dd-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          cursor: pointer;
          font-size: 13px;
          color: #333;
          transition: background .15s;
        }
        .tm-dd-item:hover { background: #F3F4F6; color: #0D6EFD; }
        .tm-flag { width: 20px; height: 14px; object-fit: cover; border-radius: 2px; border: 1px solid #eee; flex-shrink: 0; }

        .social-icon-btn { width: 34px; height: 34px; border-radius: 50%; background: #f0f0f0; color: #555; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: .2s; text-decoration: none; }
        .social-icon-btn:hover { background: #0D6EFD; color: white; }
        .footer-links p { cursor: pointer; transition: .15s; }
        .footer-links p:hover { color: #0D6EFD; }

        .footer-dd-wrap { position: relative; display: inline-block; }
        .footer-dd-trigger { display: flex; align-items: center; gap: 6px; cursor: pointer; padding: 6px 12px; border: 1px solid #E5E7EB; border-radius: 6px; background: #fff; color: #444; font-weight: 500; transition: all 0.2s ease; user-select: none; }
        .footer-dd-trigger:hover { background: #EEF4FF; border-color: #0D6EFD; color: #0D6EFD; }
        .footer-dd-menu { position: absolute; bottom: calc(100% + 6px); right: 0; background: white; border: 1px solid #E5E7EB; border-radius: 8px; box-shadow: 0 -4px 16px rgba(0,0,0,.10); z-index: 999; min-width: 140px; overflow: hidden; }
        .footer-dd-item { display: flex; align-items: center; gap: 8px; padding: 10px 14px; cursor: pointer; font-size: 13px; color: #333; transition: background .15s; }
        .footer-dd-item:hover { background: #F3F4F6; color: #0D6EFD; }
      `}</style>

      {/* NOTIFICATION */}
      {notification && <div className="notification">{notification}</div>}

      {/* NAVBAR */}
      <nav className="bg-white border-b border-[#E5E7EB] py-3.5 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-2 cursor-pointer" onClick={resetToHome}>
              <img
                src="/images/logo.png"
                alt="Brand Logo"
                className="w-[120px] h-[45px] object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="hidden items-center gap-2">
                <div className="w-[38px] h-[38px] rounded-lg bg-[#0D6EFD] flex items-center justify-center text-white text-xl font-extrabold font-['Sora']">B</div>
                <span className="text-[26px] font-extrabold text-[#0D6EFD] font-['Sora']">Brand</span>
              </div>
            </div>
            <button className="md:hidden text-2xl text-gray-600 focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* SEARCH BAR SECTION WITH CATEGORY FILTER */}
          <div className="w-full md:flex-1 md:max-w-[600px] flex border-2 border-[#0D6EFD] rounded-lg overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
              className="flex-1 border-none px-3 py-2 outline-none text-sm" />
            
            <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} className="hidden sm:block border-none border-l border-gray-200 px-3 text-xs bg-white cursor-pointer">
              <option value="All category">All category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothes">Clothes</option>
              <option value="Furniture">Furniture</option>
              <option value="Computer and tech">Computer and tech</option>

            </select>
            
            <button
              className="bg-[#0D6EFD] text-white px-5 font-semibold text-sm hover:bg-[#0b5ed7] transition-colors"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div className={`${mobileMenuOpen ? "flex" : "hidden"} md:flex flex-row gap-2 justify-around md:justify-end items-center w-full md:w-auto mt-2 md:mt-0`}>
            <button className="flex flex-col items-center gap-1 p-2 rounded-lg text-gray-600 hover:bg-[#E8F1FF] hover:text-[#0D6EFD] transition-all" onClick={() => navigate("/profile")}>
              <svg className="w-5 h-5 stroke-current fill-none stroke-[1.8]" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="text-[11px] font-medium">Profile</span>
            </button>

            <button className="flex flex-col items-center gap-1 p-2 rounded-lg text-gray-600 hover:bg-[#E8F1FF] hover:text-[#0D6EFD] transition-all" onClick={() => navigate("/messages")}>
              <svg className="w-5 h-5 stroke-current fill-none stroke-[1.8]" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              <span className="text-[11px] font-medium">Messages</span>
            </button>

            <button className="flex flex-col items-center gap-1 p-2 rounded-lg text-gray-600 hover:bg-[#E8F1FF] hover:text-[#0D6EFD] transition-all" onClick={() => navigate("/orders")}>
              <svg className="w-5 h-5 stroke-current fill-none stroke-[1.8]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-[11px] font-medium">Orders</span>
            </button>

            <button className="relative flex flex-col items-center gap-1 p-2 rounded-lg text-gray-600 hover:bg-[#E8F1FF] hover:text-[#0D6EFD] transition-all" onClick={() => navigate("/cart")}>
              <svg className="w-5 h-5 stroke-current fill-none stroke-[1.8]" viewBox="0 0 24 24">
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 1.92 1.61h9.72a2 2 0 0 0 1.92-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="20" r="1.5"/>
                <circle cx="20" cy="20" r="1.5"/>
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-2 bg-[#FA5252] text-white text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
              <span className="text-[11px] font-medium">My cart</span>
            </button>
          </div>
        </div>
      </nav>

      {/* TOP MENU */}
      <div className="bg-white border-b border-[#E5E7EB] hidden md:block">
        <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center py-3" style={{ flexWrap: "nowrap" }}>
          <div className="flex items-center gap-6" style={{ flexShrink: 1, minWidth: 0, overflow: "hidden" }}>
            <div
              className="flex items-center gap-2 text-sm font-semibold cursor-pointer hover:text-[#0D6EFD] transition-colors"
              style={{ whiteSpace: "nowrap" }}
              onClick={() => handleMenuClick("All Categories")}
            >
              <FaBars /> All category
            </div>
            <div className="flex gap-5 text-sm text-gray-700">
              {["Hot offers", "Gift boxes", "Projects", "Menu item", "Help ▾"].map((item) => (
                <span key={item} className={`cursor-pointer hover:text-[#0D6EFD] whitespace-nowrap ${activeMenuTab === (item.includes("Help") ? "Help" : item) ? "text-[#0D6EFD] font-bold" : ""}`} onClick={() => handleMenuClick(item)}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3" style={{ flexShrink: 0 }}>
            {/* Language dropdown */}
            <div className="tm-dd-wrap" onClick={(e) => e.stopPropagation()}>
              <div className="tm-dd-trigger" onClick={() => { setLangOpen(!langOpen); setShipOpen(false); }}>
                {selectedLang.flag} {selectedLang.text} ▾
              </div>
              {langOpen && (
                <div className="tm-dd-menu">
                  {LANGUAGES.map((l) => (
                    <div key={l.text} className="tm-dd-item" onClick={() => { setSelectedLang(l); setLangOpen(false); showNotification(`💱 Changed to ${l.text}`); }}>
                      {l.flag} {l.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ship to dropdown */}
            <div className="tm-dd-wrap" onClick={(e) => e.stopPropagation()}>
              <div className="tm-dd-trigger" onClick={() => { setShipOpen(!shipOpen); setLangOpen(false); }}>
                <span>Ship to</span>
                <img src={selectedCountry.flag} alt={selectedCountry.name} className="tm-flag" />
                ▾
              </div>
              {shipOpen && (
                <div className="tm-dd-menu">
                  {COUNTRIES.map((c) => (
                    <div key={c.name} className="tm-dd-item" onClick={() => { setSelectedCountry(c); setShipOpen(false); showNotification(`📍 Shipping to ${c.name}`); }}>
                      <img src={c.flag} alt={c.name} className="tm-flag" />
                      {c.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH RESULTS VIEW CONDITION */}
      {showResults ? (
        <div className="max-w-[1200px] mx-auto px-4 mt-6 min-h-[60vh]">
          <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-lg border border-[#E5E7EB] shadow-sm">
            <button onClick={resetToHome} className="flex items-center gap-2 text-sm font-semibold text-[#0D6EFD] hover:text-[#0b5ed7] transition-colors">
              <FaArrowLeft /> Back to Home
            </button>
            <span className="text-gray-300">|</span>
            <h2 className="text-lg font-bold font-['Sora'] text-gray-800">
              Search Results for: <span className="text-[#0D6EFD]">"{searchQuery}"</span> ({searchResults.length} items found)
            </h2>
          </div>

          {searchResults.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
              {searchResults.map(item => (
                <div key={item.id} className="product-card flex flex-col justify-between h-full bg-white border border-[#E5E7EB] rounded-lg p-4" onClick={() => handleProductClick(item)}>
                  <div>
                    <div className="w-full aspect-square flex items-center justify-center overflow-hidden p-2 bg-gray-50 rounded-md">
                      <img src={item.image || item.img} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="mt-3">
                      <h3 className="text-base font-['Sora'] font-bold text-gray-900">
                        {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price}
                      </h3>
                      <h4 className="text-xs font-medium text-gray-600 mt-1 leading-normal line-clamp-2">{item.name}</h4>
                      {item.category && <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full mt-2 inline-block">{item.category}</span>}
                    </div>
                  </div>
                  <button 
                    className="w-full bg-[#0D6EFD] text-white border-none padding py-2 rounded-6px font-semibold text-xs cursor-pointer transition-all ease mt-4 flex items-center justify-center gap-2 hover:bg-[#0b5ed7]"
                    onClick={(e) => handleAddToCart(e, item)}
                  >
                    <FaShoppingCart size={12} /> Add to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border border-[#E5E7EB] shadow-sm">
              <p className="text-gray-500 font-medium text-base">No items match your keyword exploration.</p>
              <button onClick={resetToHome} className="mt-4 bg-[#0D6EFD] text-white px-5 py-2 rounded-md font-semibold text-sm hover:bg-[#0b5ed7]">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* DYNAMIC VIEWS FOR CLICKED TOP MENU ITEMS */}
          {activeMenuTab && (
            <div className="bg-[#E8F1FF] border-b border-blue-200 py-6 transition-all">
              <div className="max-w-[1200px] mx-auto px-4 relative">
                <button className="absolute top-0 right-4 text-gray-500 hover:text-red-500 text-lg" onClick={() => setActiveMenuTab(null)}>
                  <FaTimes />
                </button>
                
                {activeMenuTab === "Hot offers" && (
                  <div>
                    <h3 className="text-xl font-bold font-['Sora'] text-blue-900 mb-2">🔥 Limited Hot Offers Just For You!</h3>
                    <p className="text-sm text-gray-600 mb-4">Grab premium items with up to 50% flat discount before they fly away.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded absolute">50% OFF</span>
                        <img src="/images/watch.png" className="h-16 mx-auto object-contain mt-2" />
                        <p className="text-xs font-semibold mt-1">Premium Edition Watch</p>
                        <p className="text-sm font-bold text-red-500">$37.50 <span className="text-xs text-gray-400 line-through">$75.00</span></p>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded absolute">30% OFF</span>
                        <img src="/images/image 29.png" className="h-16 mx-auto object-contain mt-2" />
                        <p className="text-xs font-semibold mt-1">Noise Cancelling Bass Pro</p>
                        <p className="text-sm font-bold text-red-500">$20.99 <span className="text-xs text-gray-400 line-through">$29.99</span></p>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded absolute">25% OFF</span>
                        <img src="/images/camera.png" className="h-16 mx-auto object-contain mt-2" />
                        <p className="text-xs font-semibold mt-1">Ultra HD Action GoPro</p>
                        <p className="text-sm font-bold text-red-500">$135.00 <span className="text-xs text-gray-400 line-through">$180.00</span></p>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded absolute">40% OFF</span>
                        <img src="/images/image 34.png" className="h-16 mx-auto object-contain mt-2" />
                        <p className="text-xs font-semibold mt-1">Sleek Book Core Laptop</p>
                        <p className="text-sm font-bold text-red-500">$270.00 <span className="text-xs text-gray-400 line-through">$450.00</span></p>
                      </div>
                    </div>
                  </div>
                )}

                {activeMenuTab === "Gift boxes" && (
                  <div>
                    <h3 className="text-xl font-bold font-['Sora'] text-purple-900 mb-2">🎁 Corporate & Festive Gift Boxes</h3>
                    <p className="text-sm text-gray-600 mb-4">Beautifully curated custom surprise bundles designed for premium clients & loved ones.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg flex items-center gap-3">
                        <div className="text-3xl">💼</div>
                        <div>
                          <h4 className="text-sm font-bold">Executive Office Pack</h4>
                          <p className="text-xs text-gray-500">Includes Leather Notebook, metallic pen, and mug.</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg flex items-center gap-3">
                        <div className="text-3xl">🔋</div>
                        <div>
                          <h4 className="text-sm font-bold">Tech Enthusiast Hamper</h4>
                          <p className="text-xs text-gray-500">Includes Smart Power Bank, Pods, and power bank.</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg flex items-center gap-3">
                        <div className="text-3xl">🎁</div>
                        <div>
                          <h4 className="text-sm font-bold">Luxury Treat Delight</h4>
                          <p className="text-xs text-gray-500">Includes premium items and custom blend hampers.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeMenuTab === "Projects" && (
                  <div>
                    <h3 className="text-xl font-bold font-['Sora'] text-emerald-900 mb-2">🏗️ Global Sourcing & Supply Projects</h3>
                    <p className="text-sm text-gray-600 mb-4">See how commercial builders and enterprise leaders fulfil massive import projects globally.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border-l-4 border-emerald-500">
                        <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Completed</span>
                        <h4 className="font-bold text-sm mt-1">Smart City Infrastructure Supply</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Sourced over 15,000+ LED lights and automation kits for Berlin commercial units.</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-l-4 border-amber-500">
                        <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">In Progress</span>
                        <h4 className="font-bold text-sm mt-1">Eco-Friendly Hotel Interiors</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Custom safe wood chairs and premium ceramic table sets in manufacturing phase.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeMenuTab === "Menu item" && (
                  <div>
                    <h3 className="text-xl font-bold font-['Sora'] text-indigo-900 mb-2">📋 Quick Links & Extra Features</h3>
                    <p className="text-sm text-gray-600 mb-3">Instant navigation shortcuts tailored for automated trading.</p>
                    <div className="flex gap-3 flex-wrap">
                      {["Wholesale Directory", "Verified Suppliers list", "Daily Quote Analyzer", "Custom Cargo Booking", "VIP Loyalty Hub"].map((m) => (
                        <button key={m} className="bg-white hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm text-indigo-800 transition-all" onClick={() => showNotification(`Directing to: ${m}`)}>
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeMenuTab === "Help" && (
                  <div>
                    <h3 className="text-xl font-bold font-['Sora'] text-gray-900 mb-1">💡 Help Center & Buyer Support</h3>
                    <p className="text-sm text-gray-600 mb-4">Need help regarding safety, custom clearings, or order tracking?</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-white p-3 rounded-lg text-center cursor-pointer hover:bg-gray-50" onClick={() => showNotification("Navigating to Dispute Resolution")}>
                        <p className="font-bold text-sm text-blue-600">🛡️ Safe Trade Protection</p>
                        <p className="text-xs text-gray-400 mt-0.5">Learn how we keep your funds secure</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center cursor-pointer hover:bg-gray-50" onClick={() => showNotification("Opening Live Support Tracker")}>
                        <p className="font-bold text-sm text-blue-600">📦 Tracking Logistics</p>
                        <p className="text-xs text-gray-400 mt-0.5">Real-time sea/air tracking guidelines</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center cursor-pointer hover:bg-gray-50" onClick={() => showNotification("Initiating Live Chat Support")}>
                        <p className="font-bold text-sm text-blue-600">💬 24/7 Agent Chat</p>
                        <p className="text-xs text-gray-400 mt-0.5">Connect with real manufacturer coordinators</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MAIN CONTAINER */}
          <div className="max-w-[1200px] mx-auto px-4">
            
            {/* HERO GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_220px] gap-4 mt-5">
              
              {/* ALL CATEGORY SIDEBAR */}
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-2.5 hidden lg:block">
                {categories.map((item, i) => (
                  <div key={item}>
                    <div 
                      className={`sidebar-item ${activeCategory === i ? "active" : ""}`} 
                      onClick={() => handleSidebarCategoryToggle(i, item)}
                    >
                      {item} <span className="text-gray-400 text-xs">{openCategoryItems === item ? "▼" : "›"}</span>
                    </div>

                    {openCategoryItems === item && (
                      <div className="bg-[#F8FAFC] border border-blue-100 p-2 my-1 rounded-md grid grid-cols-1 gap-2">
                        {categoryDummyPictures[item]?.map((pic) => (
                          <div key={pic.id} className="bg-white border border-gray-100 p-2 rounded flex items-center gap-2 shadow-sm">
                            <img src={pic.img} alt={pic.name} className="w-[60px] h-[60px] object-cover rounded-md flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-[12px] font-semibold text-gray-800 truncate">{pic.name}</p>
                              <p className="text-[12px] font-bold text-[#0D6EFD] mt-0.5">{pic.price}</p>
                            </div>
                            <button 
                              className="bg-[#0D6EFD] text-white text-[12px] w-6 h-6 rounded-full font-bold flex items-center justify-center hover:bg-[#0b5ed7]"
                              onClick={(e) => handleAddToCart(e, pic)}
                            >
                              +
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="rounded-lg p-8 sm:p-10 flex items-center min-h-[280px] sm:min-h-[320px] bg-cover bg-center" style={{ backgroundImage: "url('/images/Banner-board.png')" }}>
                <div className="relative z-10">
                  <p className="text-sm sm:text-base text-gray-600 font-medium">Latest trading</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-none my-3 font-['Sora'] text-gray-900">
                    Electronic<br />items
                  </h1>
                  <button className="bg-[#0D6EFD] text-white font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-[#0b5ed7]" onClick={() => navigate("/products")}>
                    Source now
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <div className="bg-[#E8F1FF] p-4 rounded-lg flex-1">
                  {user ? (
                    <>
                      <h3 className="text-base font-['Sora'] font-semibold">Hi, {user.name}</h3>
                      <p className="text-xs text-gray-500 my-1">Welcome back to shopping</p>
                      <button className="w-full bg-[#0D6EFD] text-white font-semibold text-sm py-2 rounded-md hover:bg-[#0b5ed7] mt-2" onClick={() => navigate("/profile")}>
                        View Profile
                      </button>
                      <button className="w-full bg-white text-[#0D6EFD] border border-[#0D6EFD] font-semibold text-sm py-2 rounded-md hover:bg-[#E8F1FF] mt-2 transition-colors cursor-pointer" onClick={logout}>
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-base font-['Sora'] font-semibold">Hi, user</h3>
                      <p className="text-xs text-gray-500 my-1">let's get started</p>
                      <button className="w-full bg-[#0D6EFD] text-white font-semibold text-sm py-2 rounded-md hover:bg-[#0b5ed7] mt-2" onClick={() => navigate("/signup")}>Join now</button>
                      <button className="w-full bg-white text-[#0D6EFD] border border-[#0D6EFD] font-semibold text-sm py-2 rounded-md hover:bg-[#E8F1FF] mt-2 transition-colors cursor-pointer" onClick={() => navigate("/login")}>
                        Log in
                      </button>
                    </>
                  )}
                </div>
                <div className="bg-[#F97316] text-white text-sm font-medium p-4 rounded-lg flex-1">Get US $10 off with a new supplier</div>
                <div className="bg-[#06B6D4] text-white text-sm font-medium p-4 rounded-lg flex-1">Send quotes with supplier preferences</div>
              </div>
            </div>

            {/* DEALS SECTION */}
            <div className="mt-5 bg-white border border-[#E5E7EB] rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[200px_repeat(5,1fr)] overflow-hidden">
              <div className="p-5 border-b sm:border-b-0 sm:border-r border-[#E5E7EB] flex flex-col justify-center">
                <h2 className="text-lg font-['Sora'] font-bold">Deals and offers</h2>
                <p className="text-xs text-gray-500 mt-1">Hygiene equipments</p>
                <div className="flex gap-1.5 mt-4 flex-wrap">
                  {[{ val: days, label: "Days" }, { val: hours, label: "Hour" }, { val: mins, label: "Min" }, { val: secs, label: "Sec" }].map((t) => (
                    <div key={t.label} className="w-11 h-12 bg-[#606060] text-white rounded-md flex flex-col items-center justify-center text-[10px]">
                      <strong className="text-base font-['Sora'] font-bold leading-tight">{t.val}</strong>
                      <span className="opacity-80">{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {products.map((item) => (
                <div className="deal-card p-4 text-center border-b sm:border-b-0 border-r border-[#E5E7EB] flex flex-col justify-between items-center h-full group" key={item.id}>
                  <div className="w-full aspect-square max-h-[110px] flex items-center justify-center overflow-hidden p-1">
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105" />
                  </div>
                  <div className="w-full mt-3">
                    <h4 className="text-xs font-medium text-gray-700 truncate px-1">{item.name}</h4>
                    <div className="discount mt-1.5">{item.discount}</div>
                  </div>
                  <button className="deal-cart-btn shadow-md" onClick={(e) => handleAddToCart(e, item)}>
                    <FaShoppingCart size={13} />
                  </button>
                </div>
              ))}
            </div>

            {/* HOME & OUTDOOR */}
            <div className="mt-5 bg-white border border-[#E5E7EB] rounded-lg grid grid-cols-1 lg:grid-cols-[260px_1fr] overflow-hidden">
              <div className="p-6 flex flex-col justify-center bg-cover bg-center min-h-[150px] lg:min-h-[250px]" style={{ backgroundImage: "url('/images/Group 969.png')" }}>
                <h2 className="text-xl sm:text-2xl font-['Sora'] font-bold mb-3 text-gray-900">Home and outdoor</h2>
                <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-md w-fit hover:bg-gray-100 shadow" onClick={() => navigate("/products")}>Source now</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {homeOutdoorItems.map((item) => (
                  <div key={item.id} className="grid-product-card border-r border-b border-[#E5E7EB] p-4 cursor-pointer" onClick={() => navigate("/products", { state: { category: "Home and outdoor", item } })}>
                    <div className="flex flex-col justify-between h-full min-w-0 w-full">
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-gray-800 truncate">{item.name}</h4>
                        <p className="text-[11px] text-[#8B96A5] mt-0.5">{item.price}</p>
                      </div>
                      <span className="grid-cart-trigger text-xs font-medium text-[#0D6EFD] mt-2 block" onClick={(e) => handleAddToCart(e, item)}>
                        <FaShoppingCart className="inline mr-1" /> + Add
                      </span>
                    </div>
                    <div className="w-full sm:w-16 h-20 sm:h-16 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded overflow-hidden p-1">
                      <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONSUMER ELECTRONICS */}
            <div className="mt-4 bg-white border border-[#E5E7EB] rounded-lg grid grid-cols-1 lg:grid-cols-[260px_1fr] overflow-hidden">
              <div className="p-6 flex flex-col justify-center bg-cover bg-center min-h-[150px] lg:min-h-[250px]" style={{ backgroundImage: "url('/images/image 98.png')" }}>
                <h2 className="text-xl sm:text-2xl font-['Sora'] font-bold mb-3 text-gray-900">Consumer electronics & gadgets</h2>
                <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-md w-fit hover:bg-gray-100 shadow" onClick={() => navigate("/products")}>Source now</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {electronicsItems.map((item) => (
                  <div key={item.id} className="grid-product-card border-r border-b border-[#E5E7EB] p-4 cursor-pointer" onClick={() => navigate("/products", { state: { category: "Consumer electronics", item } })}>
                    <div className="flex flex-col justify-between h-full min-w-0 w-full">
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-gray-800 truncate">{item.name}</h4>
                        <p className="text-[11px] text-[#8B96A5] mt-0.5">{item.price}</p>
                      </div>
                      <span className="grid-cart-trigger text-xs font-medium text-[#0D6EFD] mt-2 block" onClick={(e) => handleAddToCart(e, item)}>
                        <FaShoppingCart className="inline mr-1" /> + Add
                      </span>
                    </div>
                    <div className="w-full sm:w-16 h-20 sm:h-16 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded overflow-hidden p-1">
                      <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUOTE INQUIRY FORM */}
            <div className="mt-5 rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-8 flex items-center bg-cover bg-center rounded-lg min-h-[200px]" style={{ backgroundImage: "url('/images/Group 982.png')" }}>
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-['Sora'] font-bold text-white leading-tight">An easy way to send requests to all suppliers</h2>
                  <p className="text-sm text-white/90 mt-2">Submit your requirements and match with direct manufacturers globally.</p>
                </div>
              </div>
              <div className="bg-white border border-[#E5E7EB] p-6 rounded-lg">
                <h3 className="text-lg font-['Sora'] font-bold mb-4">Send quote to suppliers</h3>
                <div className="mb-3"><input type="text" placeholder="What item you need?" className="w-full p-2.5 border border-[#E5E7EB] rounded-md text-sm outline-none focus:border-[#0D6EFD]" /></div>
                <div className="mb-3"><textarea placeholder="Type more details" className="w-full p-2.5 border border-[#E5E7EB] rounded-md text-sm h-16 resize-none outline-none focus:border-[#0D6EFD]"></textarea></div>
                <div className="mb-4 flex gap-3">
                  <input type="number" placeholder="Quantity" className="flex-1 p-2.5 border border-[#E5E7EB] rounded-md text-sm outline-none focus:border-[#0D6EFD]" />
                  <select className="border border-[#E5E7EB] rounded-md px-3 text-sm bg-white"><option>Pcs</option><option>Kg</option><option>Set</option></select>
                </div>
                <button className="w-full bg-[#0D6EFD] text-white font-semibold text-sm py-2.5 rounded-md hover:bg-[#0b5ed7]" onClick={() => showNotification("✅ Quote request sent!")}>Send inquiry</button>
              </div>
            </div>

            {/* RECOMMENDED ITEMS */}
            <h2 className="text-xl sm:text-2xl font-extrabold font-['Sora'] mt-10 mb-4">Recommended items</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {recommended.map((item, i) => (
                <div className="product-card" key={item.id} onClick={() => handleProductClick(item)}>
                  <div className="w-full aspect-square flex items-center justify-center overflow-hidden bg-white p-2 rounded-md">
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" onError={(e) => handleImgError(e, recFallbacks[i])} />
                  </div>
                  <div className="mt-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-['Sora'] font-bold text-gray-900">{item.price}</h3>
                      <p className="text-xs text-gray-500 mt-1 leading-normal line-clamp-2">{item.name}</p>
                    </div>
                    <button className="hover-cart-btn mt-3" onClick={(e) => handleAddToCart(e, item)}><FaShoppingCart size={13} /> Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>

            {/* EXTRA SERVICES */}
            <h2 className="text-xl sm:text-2xl font-extrabold font-['Sora'] mt-10 mb-4">Our extra services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((s) => (
                <div className="service-card" key={s.label}>
                  <div className="w-full h-32 overflow-hidden bg-[#f0f4ff]">
                    <img src={s.img} alt={s.label} className="w-full h-full object-cover" onError={(e) => handleImgError(e, s.fallback)} />
                  </div>
                  <div className="p-3.5 flex items-center gap-3 flex-1">
                    <span className="w-10 h-10 bg-[#E8F1FF] rounded-md flex items-center justify-center flex-shrink-0 transition-colors service-icon">{s.icon}</span>
                    <p className="text-xs font-semibold text-gray-800 text-left leading-snug">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* SUPPLIERS BY REGION */}
            <h2 className="text-xl sm:text-2xl font-extrabold font-['Sora'] mt-10 mb-4">Suppliers by region</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {suppliers.map((s, i) => (
                <div className="bg-white border border-[#E5E7EB] rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:border-[#0D6EFD] hover:bg-[#E8F1FF] transition-all" key={i}>
                  <img src={s.flag} alt={s.country} className="w-7 h-5 object-cover rounded-sm flex-shrink-0" onError={(e) => (e.target.src = "https://via.placeholder.com/32x24")} />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{s.country}</p>
                    <span className="text-[10px] text-gray-400 block">{s.site}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* NEWSLETTER */}
          <div className="bg-white border-t border-[#E5E7EB] text-center py-10 sm:py-12 mt-12 px-4">
            <h2 className="text-xl sm:text-2xl font-['Sora'] font-bold">Subscribe to our newsletter</h2>
            <p className="text-sm text-gray-500 mt-1">Get daily updates on upcoming offers from standard global manufacturers.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-2 mt-5 max-w-md mx-auto">
              <input type="email" placeholder="✉ Email" className="w-full sm:w-72 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-[#0D6EFD]" />
              <button className="bg-[#0D6EFD] text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-[#0b5ed7]" onClick={() => showNotification("✅ Thanks for subscribing!")}>Subscribe</button>
            </div>
          </div>
        </>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 pt-10 mt-12">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1.5fr] gap-8">
          <div className="flex flex-col gap-4">
            <img src="/images/logo.png" alt="Brand Logo" className="w-[120px] object-contain" />
            <p className="text-sm text-gray-600 leading-relaxed">Best logistics platform connecting worldwide suppliers and corporate trade.</p>
            <div className="flex gap-3">
              <a href="https://facebook.com" className="social-icon-btn"><FaFacebookF size={14} /></a>
              <a href="https://twitter.com" className="social-icon-btn"><FaTwitter size={14} /></a>
              <a href="https://linkedin.com" className="social-icon-btn"><FaLinkedinIn size={14} /></a>
              <a href="https://instagram.com" className="social-icon-btn"><FaInstagram size={14} /></a>
              <a href="https://youtube.com" className="social-icon-btn"><FaYoutube size={14} /></a>
            </div>
          </div>
          {["About", "Partnership", "Information", "For users"].map((title) => (
            <div key={title}>
              <h3 className="font-['Sora'] text-sm font-bold text-gray-900 mb-4">{title}</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-600 footer-links">
                <p>Corporate Overview</p>
                <p>Resource Directory</p>
                <p>Legal Compliance</p>
                
                {title === "For users" && (
                  <div className="mt-4 flex flex-col gap-2">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Get App</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a href="#" className="inline-block transition-transform hover:scale-105">
                        <img src="/images/market-button.png" alt="App Store" className="h-[32px] object-contain" />
                      </a>
                      <a href="#" className="inline-block transition-transform hover:scale-105">
                        <img src="/images/Group.png" alt="Google Play" className="h-[32px] object-contain" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* FOOTER BOTTOM BAR */}
        <div className="border-t border-gray-200 mt-10 py-5 bg-[#F7FAFC]">
          <div className="max-w-[1200px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-2">
            <p>© 2026 Brand Ecommerce. All rights reserved.</p>
            
            <div className="footer-dd-wrap" onClick={(e) => e.stopPropagation()}>
              <div className="footer-dd-trigger" onClick={() => setFooterLangOpen(!footerLangOpen)}>
                <img src={footerLang.flag} alt={footerLang.name} style={{ width: 20, height: 14, borderRadius: 2, objectFit: "cover" }} />
                <span>{footerLang.name} ▲</span>
              </div>
              
              {footerLangOpen && (
                <div className="footer-dd-menu">
                  {FOOTER_LANGUAGES.map((lang) => (
                    <div 
                      key={lang.name} 
                      className="footer-dd-item" 
                      onClick={() => { 
                        setFooterLang(lang); 
                        setFooterLangOpen(false); 
                        showNotification(`Language changed to ${lang.name}`); 
                      }}
                    >
                      <img src={lang.flag} alt={lang.name} style={{ width: 20, height: 14, borderRadius: 2, objectFit: "cover" }} />
                      {lang.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}