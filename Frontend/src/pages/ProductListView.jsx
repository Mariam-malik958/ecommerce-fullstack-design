import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaStar, FaTimes } from 'react-icons/fa';
import { useCart } from "../context/CartContext.jsx";

const initialProducts = [
  {
    id: 1,
    name: "Canon Camera EOS 2000, Black 10x zoom",
    price: 998.0,
    originalPrice: 1128.0,
    image: "/images/image 33.png",
    rating: 4.5,
    orders: 154,
    verified: true,
    shipping: "Free Shipping",
    brand: "Samsung",
    category: "Electronics",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 2,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 998.0,
    originalPrice: 1128.0,
    image: "/images/image 23.png",
    rating: 4.5,
    orders: 154,
    verified: true,
    shipping: "Free Shipping",
    brand: "Apple",
    category: "Electronics",
    description: "UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
  {
    id: 3,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 998.0,
    originalPrice: 1128.0,
    image: "/images/image 32.png",
    rating: 4.5,
    orders: 154,
    verified: false,
    shipping: "Free Shipping",
    brand: "Huawei",
    category: "Mobile accessory",
    description: "UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
  {
    id: 4,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 998.0,
    originalPrice: 1128.0,
    image: "/images/image 34.png",
    rating: 4.5,
    orders: 154,
    verified: true,
    shipping: "Free Shipping",
    brand: "Pocco",
    category: "Smartphones",
    description: "UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
  {
    id: 5,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 998.0,
    originalPrice: 1128.0,
    image: "/images/watch.png",
    rating: 4.5,
    orders: 154,
    verified: false,
    shipping: "Free Shipping",
    brand: "Lenovo",
    category: "Modern tech",
    description: "UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
  {
    id: 6,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 998.0,
    originalPrice: 1128.0,
    image: "/images/image 86.png",
    rating: 4.5,
    orders: 154,
    verified: true,
    shipping: "Free Shipping",
    brand: "Samsung",
    category: "Mobile accessory",
    description: "UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
];

const ProductListView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get('search') || '';
  const { addToCart, cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => {
    navigate(`/products?search=${searchQuery}`);
  };
  const [products, setProducts] = useState(initialProducts);
  const [viewMode, setViewMode] = useState("list");
  const [showVerified, setShowVerified] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [notification, setNotification] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const [shipOpen, setShipOpen] = useState(false);
  const [footerLangOpen, setFooterLangOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState(null);

  const [selectedLang, setSelectedLang] = useState({ flag: "🇺🇸", text: "English, USD" });
  const [selectedCountry, setSelectedCountry] = useState({ name: "Germany", flag: "https://flagcdn.com/w20/de.png" });
  const [footerLang, setFooterLang] = useState({ name: "English", flag: "https://flagcdn.com/w20/us.png" });

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sliderMin, setSliderMin] = useState(0);
  const [sliderMax, setSliderMax] = useState(999999);
  const [condition, setCondition] = useState("Any");

  const handleBrandClick = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2500);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    showNotification(`🛒 ${product.name} added to cart!`);
  };

  const handleMenuClick = (item) => {
    if (item.includes("Help")) {
      setActiveMenuTab(activeMenuTab === "Help" ? null : "Help");
    } else {
      setActiveMenuTab(activeMenuTab === item ? null : item);
    }
  };

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        const mappedData = data.map(p => ({
          ...p,
          id: p._id,
          originalPrice: p.price * 1.2,
          rating: 4.5,
          orders: p.stock > 0 ? 154 : 0,
          verified: true,
          shipping: "Free Shipping",
          brand: "Generic",
        }));
        setProducts([...initialProducts, ...mappedData]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const isAnyFilterActive = selectedCategory !== "" || selectedBrands.length > 0 || showVerified;
  const categoryParam = queryParams.get('category') || '';
  const filteredProducts = products.filter((product) => {
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesCategory = (selectedCategory === '' && categoryParam === '') || product.category === (selectedCategory || categoryParam);
    const matchesVerified = !showVerified || product.verified;
    const price = product.price;
    const matchesSearch = product.name.toLowerCase().includes(searchParam.toLowerCase());
    const matchesPrice = (minPrice === "" || price >= Number(minPrice)) && (maxPrice === "" || price <= Number(maxPrice));
    return matchesBrand && matchesCategory && matchesVerified && matchesPrice && matchesSearch;
  });

  const languages = [
    { flag: "🇺🇸", text: "English, USD" },
    { flag: "🇩🇪", text: "Deutsch, EUR" },
    { flag: "🇵🇰", text: "Urdu, PKR" },
    { flag: "🇦🇪", text: "Arabic, AED" },
  ];

  const countries = [
    { name: "Germany", flag: "https://flagcdn.com/w20/de.png" },
    { name: "USA", flag: "https://flagcdn.com/w20/us.png" },
    { name: "UK", flag: "https://flagcdn.com/w20/gb.png" },
    { name: "Pakistan", flag: "https://flagcdn.com/w20/pk.png" },
    { name: "UAE", flag: "https://flagcdn.com/w20/ae.png" },
  ];

  const footerLanguages = [
    { name: "English", flag: "https://flagcdn.com/w20/us.png" },
    { name: "Deutsch", flag: "https://flagcdn.com/w20/de.png" },
    { name: "Urdu", flag: "https://flagcdn.com/w20/pk.png" },
    { name: "Arabic", flag: "https://flagcdn.com/w20/ae.png" },
    { name: "Français", flag: "https://flagcdn.com/w20/fr.png" }
  ];

  return (
    <div style={{ background: "#F7FAFC", minHeight: "100vh", fontFamily: "'DM Sans', Arial, sans-serif", color: "#333" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Sora:wght@400;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { background: #F7FAFC; }
        .container { width: 100%; max-width: 1200px; margin: auto; padding: 0 20px; }

        /* NOTIFICATION */
        .notification { position: fixed; top: 20px; right: 20px; background: #0D6EFD; color: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 16px rgba(13,110,253,.35); z-index: 9999; font-weight: 600; font-size: 14px; animation: slideIn .3s ease; }
        @keyframes slideIn { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

        /* NAVBAR */
        .navbar { background: white; border-bottom: 1px solid #E5E7EB; padding: 12px 0; position: sticky; top: 0; z-index: 200; box-shadow: 0 2px 8px rgba(0,0,0,.06); }
        .nav-flex { display: flex; align-items: center; gap: 16px; }
        .logo-wrap { display: flex; align-items: center; gap: 10px; cursor: pointer; text-decoration: none; flex-shrink: 0; }
        .search-box { flex: 1; display: flex; border: 2px solid #0D6EFD; border-radius: 8px; overflow: hidden; min-width: 0; }
        .search-box input { flex: 1; border: none; padding: 10px 14px; outline: none; font-size: 14px; min-width: 0; }
        .search-box select { border: none; border-left: 1px solid #ddd; padding: 0 10px; font-size: 13px; background: white; cursor: pointer; white-space: nowrap; flex-shrink: 0; }
        .search-box button { background: #0D6EFD; color: white; border: none; padding: 0 22px; cursor: pointer; font-weight: 600; font-size: 14px; flex-shrink: 0; }
        .nav-icons { display: flex; gap: 4px; align-items: center; flex-shrink: 0; }
        .nav-icon-btn { display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 7px 10px; border-radius: 8px; cursor: pointer; border: none; background: transparent; color: #555; position: relative; transition: .2s; }
        .nav-icon-btn:hover { background: #EEF4FF; color: #0D6EFD; }
        .nav-icon-btn svg { width: 22px; height: 22px; stroke: currentColor; fill: none; stroke-width: 1.8; }
        .nav-icon-btn .lbl { font-size: 11px; font-weight: 500; white-space: nowrap; }
        .cart-badge { position: absolute; top: 4px; right: 6px; background: #FA5252; color: white; border-radius: 50%; width: 17px; height: 17px; font-size: 9px; font-weight: 700; display: flex; align-items: center; justify-content: center; }

        /* TOP MENU */
        .top-menu { background: white; border-bottom: 1px solid #E5E7EB; }
        .menu-flex { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; flex-wrap: nowrap; gap: 0; }
        .menu-left { display: flex; align-items: center; gap: 20px; flex-shrink: 1; min-width: 0; overflow: hidden; }
        .menu-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
        .all-cat-btn { display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap; }
        .menu-links { display: flex; gap: 20px; font-size: 14px; }
        .menu-links span { cursor: pointer; white-space: nowrap; color: #444; transition: .15s; }
        .menu-links span:hover { color: #0D6EFD; }
        .menu-links span.active-tab { color: #0D6EFD; font-weight: 700; }

        /* DROPDOWN */
        .dd-wrap { position: relative; }
        .dd-trigger { cursor: pointer; padding: 5px 8px; border-radius: 5px; transition: .15s; display: flex; align-items: center; gap: 5px; font-size: 13px; color: #555; white-space: nowrap; }
        .dd-trigger:hover { background: #EEF4FF; color: #0D6EFD; }
        .dd-menu { position: absolute; top: calc(100% + 8px); right: 0; background: white; border: 1px solid #E5E7EB; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,.10); z-index: 999; min-width: 170px; overflow: hidden; }
        .dd-item { display: flex; align-items: center; gap: 8px; padding: 10px 14px; cursor: pointer; font-size: 13px; color: #333; transition: background .15s; }
        .dd-item:hover { background: #F3F4F6; color: #0D6EFD; }
        .flag-img { width: 20px; height: 14px; object-fit: cover; border-radius: 2px; border: 1px solid #eee; }

        /* ACTIVE MENU TAB PANEL */
        .menu-tab-panel { background: #E8F1FF; border-bottom: 1px solid #bfdbfe; padding: 24px 0; transition: all .3s; }
        .menu-tab-inner { position: relative; }
        .menu-tab-close { position: absolute; top: 0; right: 0; background: none; border: none; font-size: 18px; color: #888; cursor: pointer; line-height: 1; }
        .menu-tab-close:hover { color: #FA5252; }

        /* BREADCRUMB */
        .breadcrumb { padding: 12px 0; font-size: 13px; color: #888; display: flex; align-items: center; gap: 6px; border-bottom: 1px solid #E5E7EB; }
        .breadcrumb a { color: #0D6EFD; cursor: pointer; text-decoration: none; }
        .breadcrumb a:hover { text-decoration: underline; }

        /* LIST HEADER */
        .list-header { display: flex; justify-content: space-between; align-items: center; padding: 18px 0 14px; flex-wrap: wrap; gap: 10px; }
        .list-header h1 { font-size: 17px; font-weight: 600; color: #1a1a1a; }
        .header-controls { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
        .verified-label { display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer; color: #444; }
        .sort-select { padding: 8px 12px; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 13px; cursor: pointer; background: white; color: #333; }
        .view-toggle { display: flex; gap: 4px; }
        .view-btn { padding: 8px 11px; border: 1px solid #E5E7EB; background: white; border-radius: 6px; cursor: pointer; font-size: 15px; color: #666; transition: .15s; }
        .view-btn.active { background: #0D6EFD; color: white; border-color: #0D6EFD; }

        /* MAIN LAYOUT */
        .main-layout { display: grid; grid-template-columns: 230px 1fr; gap: 20px; margin: 0 0 40px; }

        /* SIDEBAR FILTERS */
        .sidebar { background: white; border: 1px solid #E5E7EB; border-radius: 10px; padding: 18px; height: fit-content; }
        .filter-group { margin-bottom: 18px; padding-bottom: 16px; border-bottom: 1px solid #F0F0F0; }
        .filter-group:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .filter-title { font-size: 13px; font-weight: 700; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; color: #1a1a1a; cursor: pointer; letter-spacing: .3px; text-transform: uppercase; }
        .filter-item { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 13px; color: #444; cursor: pointer; }
        .filter-item input { cursor: pointer; accent-color: #0D6EFD; }
        .filter-item label { cursor: pointer; }
        .clear-link { color: #0D6EFD; cursor: pointer; font-size: 12px; font-weight: 600; margin-top: 4px; display: inline-block; }

        /* PRICE RANGE SLIDER */
        .price-slider-wrap { position: relative; height: 20px; margin: 14px 0 10px; }
        .price-slider-track { position: absolute; top: 50%; transform: translateY(-50%); left: 0; right: 0; height: 4px; background: #E5E7EB; border-radius: 2px; }
        .price-slider-fill { position: absolute; top: 50%; transform: translateY(-50%); height: 4px; background: #0D6EFD; border-radius: 2px; }
        .price-range-slider { position: absolute; top: 50%; transform: translateY(-50%); width: 100%; height: 4px; appearance: none; -webkit-appearance: none; background: transparent; outline: none; cursor: pointer; pointer-events: none; }
        .price-range-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #0D6EFD; border: 2px solid white; box-shadow: 0 1px 4px rgba(0,0,0,.25); cursor: pointer; pointer-events: all; }
        .price-range-slider::-moz-range-thumb { width: 16px; height: 16px; border-radius: 50%; background: #0D6EFD; border: 2px solid white; box-shadow: 0 1px 4px rgba(0,0,0,.25); cursor: pointer; pointer-events: all; }
        .price-inputs-row { display: flex; gap: 8px; margin-top: 6px; }
        .price-input-box { flex: 1; padding: 6px 8px; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 12px; outline: none; color: #333; width: 0; }
        .price-input-box:focus { border-color: #0D6EFD; }
        .apply-btn { background: #0D6EFD; color: white; border: none; padding: 8px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; width: 100%; margin-top: 10px; transition: .15s; }
        .apply-btn:hover { background: #0b5ed7; }

        .sidebar-rating-stars { color: #FFD700; font-size: 14px; letter-spacing: 1px; }

        /* PRODUCTS CONTAINER */
        .products-container { background: white; border: 1px solid #E5E7EB; border-radius: 10px; padding: 20px; }
        .products-list.list-mode { display: flex; flex-direction: column; gap: 0; }
        .products-list.grid-mode { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 16px; }

        /* PRODUCT ITEM */
        .product-item { display: flex; gap: 16px; padding: 18px 0; border-bottom: 1px solid #F0F0F0; transition: background 0.2s ease; position: relative; }
        .product-item:last-child { border-bottom: none; padding-bottom: 0; }
        .grid-mode .product-item { flex-direction: column; border-bottom: none; padding: 14px; border: 1px solid #E5E7EB; border-radius: 8px; gap: 10px; }
        .grid-mode .product-item:hover { border-color: #b3d0ff; box-shadow: 0 2px 12px rgba(13,110,253,.08); }

        .product-img { width: 120px; height: 120px; object-fit: contain; border-radius: 8px; flex-shrink: 0; background: #f8f9fa; }
        .grid-mode .product-img { width: 100%; height: 150px; }
        .product-details { flex: 1; min-width: 0; }
        .product-name { font-size: 15px; font-weight: 600; color: #1a1a1a; margin-bottom: 8px; line-height: 1.4; }
        .grid-mode .product-name { font-size: 13px; }
        .price-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 6px; }
        .price-now { font-size: 18px; font-weight: 700; color: #0D6EFD; }
        .grid-mode .price-now { font-size: 16px; }
        .price-old { font-size: 13px; color: #aaa; text-decoration: line-through; }

        .rating-row { font-size: 14px; color: #FFD700; margin-bottom: 8px; display: flex; align-items: center; gap: 4px; font-weight: bold; }
        .rating-row span { color: #888; font-size: 12px; font-weight: normal; margin-left: 2px; }

        .product-desc { font-size: 13px; color: #666; line-height: 1.55; margin-bottom: 8px; }
        .grid-mode .product-desc { display: none; }
        .ship-badge { font-size: 12px; color: #28a745; font-weight: 500; }
        .view-details { color: #0D6EFD; font-size: 13px; font-weight: 500; cursor: pointer; display: inline-block; margin-top: 4px; }
        .view-details:hover { text-decoration: underline; }

        /* SIDE ACTIONS */
        .product-actions { display: flex; flex-direction: column; align-items: center; justify-content: flex-start; flex-shrink: 0; min-width: 120px; gap: 10px; align-self: flex-start; padding-top: 4px; }
        .grid-mode .product-actions { width: 100%; flex-direction: row; justify-content: space-between; align-items: center; }

        .heart-btn { background: white; border: 1px solid #E5E7EB; color: #999; font-size: 16px; width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
        .heart-btn:hover { color: #FA5252; border-color: #FA5252; }

        .add-cart-btn { background: #28a745; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px; white-space: nowrap; transition: opacity 0.2s ease, transform 0.2s ease; width: 100%; text-align: center; display: flex; align-items: center; justify-content: center; gap: 5px; opacity: 0; transform: translateY(5px); pointer-events: none; }
        .add-cart-btn:hover { background: #218838; }

        .product-item:hover .add-cart-btn { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .grid-mode .add-cart-btn { width: auto; flex: 1; }

        /* PAGINATION */
        .pagination { display: flex; justify-content: center; align-items: center; gap: 6px; margin-top: 28px; padding-top: 20px; border-top: 1px solid #E5E7EB; }
        .pg-btn { padding: 7px 13px; border: 1px solid #E5E7EB; background: white; border-radius: 6px; cursor: pointer; font-size: 13px; color: #444; transition: .15s; }
        .pg-btn:hover { background: #EEF4FF; border-color: #0D6EFD; color: #0D6EFD; }
        .pg-btn.active { background: #0D6EFD; color: white; border-color: #0D6EFD; }

        /* NEWSLETTER */
        .newsletter { background: white; border-top: 1px solid #E5E7EB; padding: 40px 20px; text-align: center; }
        .newsletter h3 { font-size: 20px; font-weight: 700; margin-bottom: 6px; }
        .newsletter p { color: #888; font-size: 14px; margin-bottom: 20px; }
        .newsletter-form { display: flex; justify-content: center; gap: 0; max-width: 400px; margin: auto; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden; }
        .newsletter-form input { flex: 1; padding: 10px 14px; border: none; font-size: 14px; outline: none; }
        .newsletter-form button { background: #0D6EFD; color: white; border: none; padding: 10px 22px; font-weight: 600; cursor: pointer; font-size: 14px; }

        /* FOOTER */
        .footer { background: white; border-top: 1px solid #E5E7EB; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr; gap: 30px; padding: 44px 0; }
        .footer-col h4 { font-size: 14px; font-weight: 700; margin-bottom: 14px; color: #1a1a1a; }
        .footer-link { color: #666; font-size: 14px; cursor: pointer; margin-bottom: 10px; transition: .15s; }
        .footer-link:hover { color: #0D6EFD; }
        .footer-desc { color: #777; font-size: 13px; line-height: 1.6; margin-bottom: 20px; max-width: 300px; }
        .social-icons { display: flex; gap: 10px; }
        .social-btn { width: 34px; height: 34px; border-radius: 50%; background: #f0f0f0; color: #555; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: .2s; text-decoration: none; }
        .social-btn:hover { background: #0D6EFD; color: white; transform: scale(1.1); }
        .footer-apps-container { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
        .footer-app-img { height: 32px; object-fit: contain; cursor: pointer; transition: transform 0.2s; }
        .footer-app-img:hover { transform: scale(1.05); }

        .footer-bottom { border-top: 1px solid #E5E7EB; padding: 16px 0; position: relative; }
        .footer-bottom-inner { display: flex; justify-content: space-between; align-items: center; color: #888; font-size: 13px; flex-wrap: wrap; gap: 8px; }

        .footer-dd-wrap { position: relative; display: inline-block; }
        .footer-dd-trigger { display: flex; align-items: center; gap: 6px; cursor: pointer; padding: 6px 12px; border: 1px solid #E5E7EB; border-radius: 6px; background: #fff; color: #444; font-weight: 500; transition: all 0.2s ease; }
        .footer-dd-trigger:hover { background: #EEF4FF; border-color: #0D6EFD; color: #0D6EFD; }

        .footer-dd-menu { position: absolute; bottom: calc(100% + 6px); right: 0; background: white; border: 1px solid #E5E7EB; border-radius: 8px; box-shadow: 0 -4px 16px rgba(0,0,0,.10); z-index: 999; min-width: 140px; overflow: hidden; }
        .footer-dd-item { display: flex; align-items: center; gap: 8px; padding: 10px 14px; cursor: pointer; font-size: 13px; color: #333; transition: background .15s; }
        .footer-dd-item:hover { background: #F3F4F6; color: #0D6EFD; }

        @media(max-width: 900px) {
          .main-layout { grid-template-columns: 200px 1fr; }
          .footer-grid { grid-template-columns: 1fr 1fr 1fr; }
          .search-box select { display: none; }
        }
        @media(max-width: 650px) {
          .main-layout { grid-template-columns: 1fr; }
          .sidebar { display: none; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .menu-links { display: none; }
        }
      `}</style>

      {notification && <div className="notification">{notification}</div>}

      {/* ── NAVBAR ── */}
      <div className="navbar">
        <div className="container nav-flex">
          <div className="logo-wrap" onClick={() => navigate("/")}>
            <img src="/images/logo.png" alt="Brand Logo" style={{ width: "120px", height: "45px", objectFit: "contain" }} />
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-none px-3 py-2 outline-none text-sm"
            />
            <select className="hidden sm:block border-none border-l border-gray-200 px-3 text-xs bg-white cursor-pointer">
              <option>All category</option>
              <option>Electronics</option>
              <option>Clothes</option>
              <option>Home</option>
            </select>
            <button className="bg-[#0D6EFD] text-white px-5 font-semibold text-sm hover:bg-[#0b5ed7] transition-colors" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="nav-icons">
            <button className="nav-icon-btn" onClick={() => navigate("/profile")}>
              <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span className="lbl">Profile</span>
            </button>
            <button className="nav-icon-btn" onClick={() => navigate("/messages")}>
              <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              <span className="lbl">Messages</span>
            </button>
            <button className="nav-icon-btn" onClick={() => navigate("/orders")}>
              <svg viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              <span className="lbl">Orders</span>
            </button>
            <button className="nav-icon-btn" onClick={() => navigate("/cart")} style={{ position: "relative" }}>
              <svg viewBox="0 0 24 24"><path d="M1 1h4l2.68 13.39a2 2 0 001.92 1.61h9.72a2 2 0 001.92-1.61L23 6H6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="20" r="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="20" cy="20" r="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
              <span className="lbl">My cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── TOP MENU ── */}
      <div className="top-menu">
        <div className="container menu-flex">
          <div className="menu-left">
            <div className="all-cat-btn" onClick={() => { setSelectedCategory(""); setSelectedBrands([]); setShowVerified(false); setActiveMenuTab(null); }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
              All category
            </div>
            <div className="menu-links">
              {["Hot offers", "Gift boxes", "Projects", "Menu item", "Help ▾"].map((item) => (
                <span
                  key={item}
                  className={activeMenuTab === (item.includes("Help") ? "Help" : item) ? "active-tab" : ""}
                  onClick={() => handleMenuClick(item)}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="menu-right">
            <div className="dd-wrap">
              <div className="dd-trigger" onClick={() => { setLangOpen(!langOpen); setShipOpen(false); }}>
                {selectedLang.flag} {selectedLang.text} ▾
              </div>
              {langOpen && (
                <div className="dd-menu">
                  {languages.map(l => (
                    <div key={l.text} className="dd-item" onClick={() => { setSelectedLang(l); setLangOpen(false); showNotification(`💱 Changed to ${l.text}`); }}>
                      {l.flag} {l.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="dd-wrap">
              <div className="dd-trigger" onClick={() => { setShipOpen(!shipOpen); setLangOpen(false); }}>
                <span>Ship to</span>
                <img src={selectedCountry.flag} alt={selectedCountry.name} className="flag-img" />
                ▾
              </div>
              {shipOpen && (
                <div className="dd-menu">
                  {countries.map(c => (
                    <div key={c.name} className="dd-item" onClick={() => { setSelectedCountry(c); setShipOpen(false); showNotification(`📍 Shipping to ${c.name}`); }}>
                      <img src={c.flag} alt={c.name} className="flag-img" />
                      {c.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── ACTIVE MENU TAB PANEL ── */}
      {activeMenuTab && (
        <div className="menu-tab-panel">
          <div className="container menu-tab-inner">
            <button className="menu-tab-close" onClick={() => setActiveMenuTab(null)}>
              <FaTimes />
            </button>

            {/* Hot Offers */}
            {activeMenuTab === "Hot offers" && (
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Sora', sans-serif", color: "#1e3a8a", marginBottom: 6 }}>🔥 Limited Hot Offers Just For You!</h3>
                <p style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>Grab premium items with up to 50% flat discount before they fly away.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14 }}>
                  {[
                    { name: "Premium Edition Watch", img: "/images/watch.png", now: "$37.50", old: "$75.00", off: "50% OFF" },
                    { name: "Noise Cancelling Bass Pro", img: "/images/image 29.png", now: "$20.99", old: "$29.99", off: "30% OFF" },
                    { name: "Ultra HD Action GoPro", img: "/images/camera.png", now: "$135.00", old: "$180.00", off: "25% OFF" },
                    { name: "Sleek Book Core Laptop", img: "/images/image 34.png", now: "$270.00", old: "$450.00", off: "40% OFF" },
                  ].map((p) => (
                    <div key={p.name} style={{ background: "white", borderRadius: 8, padding: 12, textAlign: "center", position: "relative", boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
                      <span style={{ background: "#FA5252", color: "white", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, position: "absolute", top: 8, left: 8 }}>{p.off}</span>
                      <img src={p.img} alt={p.name} style={{ height: 64, objectFit: "contain", margin: "8px auto 0", display: "block" }} />
                      <p style={{ fontSize: 11, fontWeight: 600, marginTop: 8, color: "#1a1a1a" }}>{p.name}</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#FA5252", marginTop: 4 }}>{p.now} <span style={{ fontSize: 11, color: "#aaa", textDecoration: "line-through", fontWeight: 400 }}>{p.old}</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gift Boxes */}
            {activeMenuTab === "Gift boxes" && (
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Sora', sans-serif", color: "#581c87", marginBottom: 6 }}>🎁 Corporate & Festive Gift Boxes</h3>
                <p style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>Beautifully curated custom surprise bundles designed for premium clients & loved ones.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
                  {[
                    { icon: "💼", title: "Executive Office Pack", desc: "Includes Leather Notebook, metallic pen, and mug." },
                    { icon: "🔋", title: "Tech Enthusiast Hamper", desc: "Includes Smart Power Bank, Pods, and charging cable." },
                    { icon: "🎁", title: "Luxury Treat Delight", desc: "Includes premium items and custom blend hampers." },
                  ].map((g) => (
                    <div key={g.title} style={{ background: "white", borderRadius: 8, padding: 16, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
                      <div style={{ fontSize: 28 }}>{g.icon}</div>
                      <div>
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{g.title}</h4>
                        <p style={{ fontSize: 11, color: "#888", marginTop: 3 }}>{g.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {activeMenuTab === "Projects" && (
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Sora', sans-serif", color: "#064e3b", marginBottom: 6 }}>🏗️ Global Sourcing & Supply Projects</h3>
                <p style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>See how commercial builders and enterprise leaders fulfil massive import projects globally.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
                  <div style={{ background: "white", borderRadius: 8, padding: 16, borderLeft: "4px solid #10b981", boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: 1 }}>Completed</span>
                    <h4 style={{ fontSize: 13, fontWeight: 700, marginTop: 6, color: "#1a1a1a" }}>Smart City Infrastructure Supply</h4>
                    <p style={{ fontSize: 11, color: "#888", marginTop: 4, lineHeight: 1.5 }}>Sourced over 15,000+ LED lights and automation kits for Berlin commercial units.</p>
                  </div>
                  <div style={{ background: "white", borderRadius: 8, padding: 16, borderLeft: "4px solid #f59e0b", boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: 1 }}>In Progress</span>
                    <h4 style={{ fontSize: 13, fontWeight: 700, marginTop: 6, color: "#1a1a1a" }}>Eco-Friendly Hotel Interiors</h4>
                    <p style={{ fontSize: 11, color: "#888", marginTop: 4, lineHeight: 1.5 }}>Custom safe wood chairs and premium ceramic table sets in manufacturing phase.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Menu item */}
            {activeMenuTab === "Menu item" && (
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Sora', sans-serif", color: "#1e1b4b", marginBottom: 6 }}>📋 Quick Links & Extra Features</h3>
                <p style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>Instant navigation shortcuts tailored for automated trading.</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["Wholesale Directory", "Verified Suppliers list", "Daily Quote Analyzer", "Custom Cargo Booking", "VIP Loyalty Hub"].map((m) => (
                    <button
                      key={m}
                      onClick={() => showNotification(`Directing to: ${m}`)}
                      style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 600, color: "#3730a3", cursor: "pointer", transition: ".2s" }}
                      onMouseEnter={e => { e.target.style.background = "#4f46e5"; e.target.style.color = "white"; }}
                      onMouseLeave={e => { e.target.style.background = "white"; e.target.style.color = "#3730a3"; }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Help */}
            {activeMenuTab === "Help" && (
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Sora', sans-serif", color: "#1a1a1a", marginBottom: 6 }}>💡 Help Center & Buyer Support</h3>
                <p style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>Need help regarding safety, custom clearings, or order tracking?</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
                  {[
                    { icon: "🛡️", title: "Safe Trade Protection", desc: "Learn how we keep your funds secure" },
                    { icon: "📦", title: "Tracking Logistics", desc: "Real-time sea/air tracking guidelines" },
                    { icon: "💬", title: "24/7 Agent Chat", desc: "Connect with real manufacturer coordinators" },
                  ].map((h) => (
                    <div
                      key={h.title}
                      onClick={() => showNotification(`Opening: ${h.title}`)}
                      style={{ background: "white", borderRadius: 8, padding: 14, textAlign: "center", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}
                    >
                      <p style={{ fontSize: 22 }}>{h.icon}</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0D6EFD", marginTop: 6 }}>{h.title}</p>
                      <p style={{ fontSize: 11, color: "#888", marginTop: 3 }}>{h.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ── BREADCRUMB ── */}
      <div className="container breadcrumb">
        <a onClick={() => navigate("/")}>Home</a> &rsaquo;
        <span>Clothings</span> &rsaquo;
        <span>Men's wear</span> &rsaquo;
        <span style={{ color: "#333" }}>Summer clothing</span>
      </div>

      <div className="container">
        {/* LIST HEADER */}
        <div className="list-header">
          <h1>{filteredProducts.length} items in <strong style={{ color: "#0D6EFD" }}>{selectedCategory || "All Categories"}</strong></h1>
          <div className="header-controls">
            <label className="verified-label">
              <input type="checkbox" checked={showVerified} onChange={e => setShowVerified(e.target.checked)} />
              Verified only
            </label>
            <select className="sort-select">
              <option>Featured</option>
              <option>Price Low to High</option>
              <option>Price High to Low</option>
              <option>Newest</option>
            </select>
            <div className="view-toggle">
              <button className={`view-btn ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")} title="Grid view">⊞</button>
              <button className={`view-btn ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")} title="List view">≡</button>
            </div>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="main-layout">
          {/* SIDEBAR FILTERS */}
          <aside className="sidebar">

            {/* 1. Category */}
            <div className="filter-group">
              <div className="filter-title">Category <span>⌄</span></div>
              {["Mobile accessory", "Electronics", "Smartphones", "Modern tech"].map(cat => (
                <div className="filter-item" key={cat}>
                  <input type="radio" name="category" id={`cat-${cat}`} onChange={() => setSelectedCategory(cat)} checked={selectedCategory === cat} />
                  <label htmlFor={`cat-${cat}`}>{cat}</label>
                </div>
              ))}
              <span className="clear-link" onClick={() => setSelectedCategory("")}>Clear Category</span>
            </div>

            {/* 2. Brands */}
            <div className="filter-group">
              <div className="filter-title">Brands <span>⌄</span></div>
              {["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"].map(brand => (
                <div className="filter-item" key={brand}>
                  <input type="checkbox" id={`brand-${brand}`} checked={selectedBrands.includes(brand)} onChange={() => handleBrandClick(brand)} />
                  <label htmlFor={`brand-${brand}`}>{brand}</label>
                </div>
              ))}
              <span className="clear-link" onClick={() => setSelectedBrands([])}>Clear Brands</span>
            </div>

            {/* 3. Features */}
            <div className="filter-group">
              <div className="filter-title">Features <span>⌄</span></div>
              {["Metallic", "Plastic cover", "8GB RAM", "Super AMOLED", "Large Memory"].map(feat => (
                <div className="filter-item" key={feat}>
                  <input type="checkbox" id={`feat-${feat}`} onChange={() => showNotification(`Filter applied: ${feat}`)} />
                  <label htmlFor={`feat-${feat}`}>{feat}</label>
                </div>
              ))}
            </div>

            {/* 4. Price Range - Dual Slider */}
            <div className="filter-group">
              <div className="filter-title">Price range <span>⌄</span></div>

              <div className="price-slider-wrap">
                <div className="price-slider-track" />
                <div
                  className="price-slider-fill"
                  style={{
                    left: `${(sliderMin / 999999) * 100}%`,
                    right: `${100 - (sliderMax / 999999) * 100}%`,
                  }}
                />
                <input
                  type="range" min="0" max="999999" step="1"
                  value={sliderMin}
                  className="price-range-slider"
                  style={{ zIndex: sliderMin > sliderMax - 1000 ? 5 : 3 }}
                  onChange={e => {
                    const val = Math.min(Number(e.target.value), sliderMax - 1);
                    setSliderMin(val);
                    setMinPrice(String(val));
                  }}
                />
                <input
                  type="range" min="0" max="999999" step="1"
                  value={sliderMax}
                  className="price-range-slider"
                  style={{ zIndex: 4 }}
                  onChange={e => {
                    const val = Math.max(Number(e.target.value), sliderMin + 1);
                    setSliderMax(val);
                    setMaxPrice(String(val));
                  }}
                />
              </div>

              <div className="price-inputs-row">
                <input
                  type="number" placeholder="Min" className="price-input-box"
                  value={sliderMin === 0 ? "" : sliderMin}
                  onChange={e => {
                    const val = Number(e.target.value) || 0;
                    setMinPrice(String(val));
                    setSliderMin(val);
                  }}
                />
                <input
                  type="number" placeholder="Max" className="price-input-box"
                  value={sliderMax === 999999 ? "" : sliderMax}
                  onChange={e => {
                    const val = Number(e.target.value) || 999999;
                    setMaxPrice(String(val));
                    setSliderMax(val);
                  }}
                />
              </div>
              <button className="apply-btn" onClick={() => showNotification("Price filter applied!")}>Apply</button>
            </div>

            {/* 5. Condition */}
            <div className="filter-group">
              <div className="filter-title">Condition <span>⌄</span></div>
              {["Any", "Refurbished", "Brand new", "Old items"].map(cond => (
                <div className="filter-item" key={cond}>
                  <input
                    type="radio"
                    name="condition"
                    id={`cond-${cond}`}
                    checked={condition === cond}
                    onChange={() => setCondition(cond)}
                  />
                  <label htmlFor={`cond-${cond}`}>{cond}</label>
                </div>
              ))}
            </div>

            {/* 6. Rating Filter */}
            {!isAnyFilterActive && (
              <div className="filter-group">
                <div className="filter-title">Rating <span>⌄</span></div>
                {[5, 4, 3, 2].map(star => (
                  <div className="filter-item" key={star} onClick={() => showNotification(`Filtering by ${star} Stars & above`)}>
                    <input type="checkbox" id={`sidebar-star-${star}`} />
                    <label htmlFor={`sidebar-star-${star}`} className="sidebar-rating-stars">
                      {"★".repeat(star)}{"☆".repeat(5 - star)}
                    </label>
                  </div>
                ))}
              </div>
            )}

          </aside>

          {/* PRODUCTS CONTAINER */}
          <div className="products-container">
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "50px 0", color: "#999" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <p style={{ fontSize: 16 }}>No products match the selected filters.</p>
              </div>
            ) : (
              <div className={`products-list ${viewMode === "grid" ? "grid-mode" : "list-mode"}`}>
                {filteredProducts.map(item => (
                  <div className="product-item" key={item.id}>
                    <img src={item.image || "/images/placeholder.png"} alt={item.name} className="product-img" />

                    <div className="product-details">
                      <div className="product-name">{item.name}</div>
                      <div className="price-row">
                        <span className="price-now">${item.price.toFixed(2)}</span>
                        <span className="price-old">${item.originalPrice.toFixed(2)}</span>
                      </div>

                      {!isAnyFilterActive && (
                        <div className="rating-row">
                          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                          <span> · {item.orders} orders</span>
                        </div>
                      )}

                      <div className="product-desc">{item.description}</div>
                      <div className="ship-badge">✓ {item.shipping}</div>
                      <span className="view-details" onClick={() => navigate(`/product/${item.id}`)}>View details</span>
                    </div>

                    <div className="product-actions">
                      <button className="add-cart-btn" style={{ opacity: 1, pointerEvents: "auto", transform: "none" }} onClick={(e) => handleAddToCart(e, item)}>
                        🛒 Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pagination">
              <button className="pg-btn">‹</button>
              <button className="pg-btn active">1</button>
              <button className="pg-btn">2</button>
              <button className="pg-btn">3</button>
              <button className="pg-btn">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="newsletter">
        <h3>Subscribe to our newsletter</h3>
        <p>Get daily news on upcoming offers from many suppliers all over the world</p>
        <div className="newsletter-form">
          <input type="email" placeholder="✉  Email" />
          <button onClick={() => showNotification("✅ Subscribed!")}>Subscribe</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="logo-wrap" style={{ marginBottom: 14 }} onClick={() => navigate("/")}>
              <img src="/images/logo.png" alt="Brand Logo" style={{ width: "120px", objectFit: "contain" }} />
            </div>
            <p className="footer-desc">Best logistics platform connecting worldwide suppliers and corporate trade.</p>
            <div className="social-icons">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="social-btn" onClick={e => { e.preventDefault(); showNotification("Social link"); }}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>About</h4>
            {["About Us", "Find store", "Categories", "Blogs"].map(l => (
              <div key={l} className="footer-link" onClick={() => showNotification(l)}>{l}</div>
            ))}
          </div>

          <div className="footer-col">
            <h4>Partnership</h4>
            {["About Us", "Find store", "Categories", "Blogs"].map(l => (
              <div key={l} className="footer-link" onClick={() => showNotification(l)}>{l}</div>
            ))}
          </div>

          <div className="footer-col">
            <h4>Information</h4>
            {["Help Center", "Money Refund", "Shipping", "Contact us"].map(l => (
              <div key={l} className="footer-link" onClick={() => showNotification(l)}>{l}</div>
            ))}
          </div>

          <div className="footer-col">
            <h4>For users</h4>
            {[["Login", "/login"], ["Register", "/register"], ["Settings", "/settings"], ["My Orders", "/orders"]].map(([l, p]) => (
              <div key={l} className="footer-link" onClick={() => navigate(p)}>{l}</div>
            ))}

            <h4 style={{ marginTop: 16 }}>Get app</h4>
            <div className="footer-apps-container">
              <img src="/images/market-button.png" alt="App Store" className="footer-app-img" onClick={() => showNotification("App Store Download")} />
              <img src="/images/Group.png" alt="Google Play" className="footer-app-img" onClick={() => showNotification("Google Play Download")} />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <p>© 2026 Brand Ecommerce. All rights reserved.</p>

            <div className="footer-dd-wrap">
              <div className="footer-dd-trigger" onClick={() => setFooterLangOpen(!footerLangOpen)}>
                <img src={footerLang.flag} alt={footerLang.name} style={{ width: 20, height: 14, borderRadius: 2, objectFit: "cover" }} />
                <span>{footerLang.name} ▲</span>
              </div>

              {footerLangOpen && (
                <div className="footer-dd-menu">
                  {footerLanguages.map(lang => (
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
};

export default ProductListView;