import React from "react";
import { useLocation } from "react-router-dom"; 
import "./Footer.css";
import logo from "../assets/logo.png";

import flagAE from "../assets/flags/ae.png";
import flagAU from "../assets/flags/au.png";
import flagUS from "../assets/flags/us.png";
import flagRU from "../assets/flags/ru.png";
import flagIT from "../assets/flags/it.png";
import flagDK from "../assets/flags/dk.png";
import flagFR from "../assets/flags/fr.png";
import flagCN from "../assets/flags/cn.png";
import flagGB from "../assets/flags/gb.png";

function Footer() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isProductDetailPage = location.pathname.startsWith("/product/");
  const isCartPage = location.pathname === "/cart";

  const regions = [
    { name: "Arabic Emirates", shop: "shopname.ae", flag: flagAE },
    { name: "Australia", shop: "shopname.ae", flag: flagAU },
    { name: "United States", shop: "shopname.ae", flag: flagUS },
    { name: "Russia", shop: "shopname.ru", flag: flagRU },
    { name: "Italy", shop: "shopname.it", flag: flagIT },
    { name: "Denmark", shop: "denmark.com.dk", flag: flagDK },
    { name: "France", shop: "shopname.com.fr", flag: flagFR },
    { name: "Arabic Emirates", shop: "shopname.ae", flag: flagAE },
    { name: "China", shop: "shopname.ae", flag: flagCN },
    { name: "Great Britain", shop: "shopname.co.uk", flag: flagGB },
  ];

  return (
    <footer className="footer-area">
      
      {/* 1. REGION SECTION: Only shows on Home Page */}
      {isHomePage && (
        <section className="region-section">
          <div className="container">
            <h2 className="section-title">Suppliers by region</h2>
            <div className="region-grid">
              {regions.map((item, index) => (
                <div key={index} className="region-item">
                  <img src={item.flag} alt="" className="region-flag-img" />
                  <div className="region-info">
                    <p className="region-name">{item.name}</p>
                    <p className="region-url">{item.shop}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. NEWSLETTER SECTION: Shows on Home AND Product List, 
          but hidden on Detail and Cart pages */}
      {!isProductDetailPage && !isCartPage && (
        <section className="newsletter-section">
          <div className="newsletter-container">
            <h3>Subscribe on our newsletter</h3>
            <p>Get daily news on upcoming offers from many suppliers all over the world</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-wrapper">
                <i className="fa-regular fa-envelope email-icon"></i>
                <input type="email" placeholder="Email" required />
              </div>
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      )}

      {/* SECTION B: Main Footer Links */}
      <div className="footer-main">
        <div className="container footer-flex">
          <div className="footer-brand">
            <div className="brand-display">
              <img src={logo} alt="logo" className="footer-logo" />
              <span className="brand-text">Brand</span>
            </div>
            <p className="brand-desc">Best information about the company gies here but now lorem ipsum is</p>
            <div className="social-links">
              <a href="#" className="social-icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#" className="social-icon"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="social-icon"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>

          <div className="footer-links-wrapper">
            <div className="link-col">
              <h4>About</h4>
              <p>About Us</p><p>Find store</p><p>Categories</p><p>Blogs</p>
            </div>
            <div className="link-col">
              <h4>Partnership</h4>
              <p>About Us</p><p>Find store</p><p>Categories</p><p>Blogs</p>
            </div>
            <div className="link-col">
              <h4>Information</h4>
              <p>Help Center</p><p>Money Refund</p><p>Shipping</p><p>Contact us</p>
            </div>
            <div className="link-col">
              <h4>For users</h4>
              <p>Login</p><p>Register</p><p>Settings</p><p>My Orders</p>
            </div>
            <div className="link-col">
              <h4>Get app</h4>
              <div className="app-badge">
                <i className="fa-brands fa-apple"></i>
                <div className="badge-text">
                  <span>Download on the</span>
                  <strong>App Store</strong>
                </div>
              </div>
              <div className="app-badge">
                <i className="fa-brands fa-google-play"></i>
                <div className="badge-text">
                  <span>Get it on</span>
                  <strong>Google Play</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-flex">
          <p>© 2026 Ecommerce.</p>
          <div className="lang-picker">
            <img src={flagUS} alt="" className="bottom-flag" />
            <span>English</span> <i className="fa-solid fa-chevron-up"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;