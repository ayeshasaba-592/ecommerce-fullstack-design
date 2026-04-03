import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import "./Navbar.css";
import logo from "../assets/logo.png";
import profileIcon from "../assets/profile.png";
import messageIcon from "../assets/message.png";
import ordersIcon from "../assets/orders.png";
import cartIcon from "../assets/cart.png";

import flagDE from "../assets/flags/de.png"; 
import flagPK from "../assets/flags/pk.png";
import flagUS from "../assets/flags/us.png";
import flagUK from "../assets/flags/gb.png";
import flagUAE from "../assets/flags/ae.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  const [country, setCountry] = useState("Germany");
  const [currency, setCurrency] = useState("EUR");
  const [cartCount, setCartCount] = useState(0);

  /* --- NEW SEARCH STATES --- */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All category");

 const [user] = React.useState(null); 
const [messages] = React.useState([]); 
const [orders] = React.useState([]);

  const isCartPage = location.pathname === "/cart"; 

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const count = savedCart.reduce((acc, item) => acc + item.qty, 0);
    setCartCount(count);
  }, [location]);

  /* --- SEARCH HANDLER --- */
  const handleSearch = () => {
    // This creates a URL like: /products?q=iphone&cat=Electronics
    const params = new URLSearchParams();
    if (searchQuery) params.append("q", searchQuery);
    if (selectedCategory !== "All category") params.append("cat", selectedCategory);

    navigate(`/products?${params.toString()}`);
  };

  // Allow searching by pressing "Enter" key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const flagMap = {
    "Germany": flagDE,
    "Pakistan": flagPK,
    "United States": flagUS,
    "United Kingdom": flagUK,
    "UAE": flagUAE
  };

  const countries = Object.keys(flagMap);

  const handleProfileClick = () => {
    if (!user) {
      navigate("/login"); 
    } else {
      navigate("/profile");
    }
  };

  const handleCountryChange = (e) => {
    const selected = e.target.value;
    setCountry(selected);
    if (selected === "Germany") setCurrency("EUR");
    else if (selected === "Pakistan") setCurrency("PKR");
    else if (selected === "United Kingdom") setCurrency("GBP"); 
    else if (selected === "UAE") setCurrency("AED");
    else if (selected === "United States") setCurrency("USD");
  };

  return (
    <nav className="navbar-wrapper">
      <div className="navbar-main">
        <div className="nav-container">
          <div className="left-section" onClick={() => navigate("/")} style={{cursor: 'pointer'}}>
            <img src={logo} alt="logo" className="logo" />
            <h2 className="brand-name">Brand</h2>
          </div>

          {!isCartPage ? (
            <div className="search-box">
              <input 
                placeholder="Search" 
                className="search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="select-wrapper">
                <select 
                  className="category-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All category</option>
                  <option>Electronics</option>
                  <option>Smartphones</option>
                  <option>Modern tech</option>
                </select>
              </div>
              <button className="search-btn" onClick={handleSearch}>Search</button>
            </div>
          ) : (
            <div style={{ flex: 1 }}></div>
          )}

          <div className="right-icons">
            <div className="icon-item" onClick={handleProfileClick}>
              <img src={profileIcon} alt="Profile" />
              <span>{user ? user.name : "Profile"}</span>
            </div>

            <div className="icon-item" onClick={() => navigate("/messages")}>
              <div className="icon-badge-wrapper">
                <img src={messageIcon} alt="Messages" />
                {messages.length > 0 && (
                  <span className="badge">{messages.length}</span>
                )}
              </div>
              <span>Message</span>
            </div>

            <div className="icon-item" onClick={() => navigate("/orders")}>
              <div className="icon-badge-wrapper">
                <img src={ordersIcon} alt="Orders" />
                {orders.length > 0 && (
                  <span className="badge">{orders.length}</span>
                )}
              </div>
              <span>Orders</span>
            </div>

            <div className="icon-item" onClick={() => navigate("/cart")}>
              <div className="icon-badge-wrapper">
                <img src={cartIcon} alt="Cart" />
                {cartCount > 0 && <span className="badge blue">{cartCount}</span>}
              </div>
              <span>My Cart</span>
            </div>
          </div>
        </div>
      </div>

      {!isCartPage && (
        <div className="navbar-bottom">
          <div className="nav-container bottom-flex">
            <div className="menu-links">
              <div className="nav-dropdown">
                <span className="dropdown-trigger">☰ All category</span>
                <div className="dropdown-content">
                  <li onClick={() => navigate("/products?cat=Electronics")}>Electronics</li>
                  <li onClick={() => navigate("/products?cat=Smartphones")}>Smartphones</li>
                  <li onClick={() => navigate("/products?cat=Modern tech")}>Modern tech</li>
                </div>
              </div>
              <span onClick={() => navigate("/products?filter=offers")}>Hot offers</span>
              <span>Gift boxes</span>
              <span onClick={() => navigate("/projects")}>Projects</span>
              <span>Menu item</span>
              <select className="help-select">
                <option>Help</option>
                <option>Contact Us</option>
                <option>Shipping</option>
              </select>
            </div>
            
            <div className="settings-links">
              <select className="setting-select">
                <option>English, {currency}</option>
              </select>
              <div className="ship-to">
                <span>Ship to</span>
                <img src={flagMap[country]} alt={country} className="nav-flag" />
                <select 
                  className="setting-select" 
                  value={country} 
                  onChange={handleCountryChange}
                >
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;