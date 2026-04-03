import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./Hero.css";
import banner from "../assets/banner.png";
import photo from "../assets/photo.png";

function Hero() {
  const navigate = useNavigate(); 
  // Reads the stored user object
  const user = JSON.parse(localStorage.getItem("user")); 

  const categoryList = [
    "Smartphones", "Clothing", "Home", "Electronics", "Modern tech", "Mobile accessory", "All"
  ];

  return (
    <div className="hero-wrapper">
      <div className="white-container">
        
        <div className="categories-panel">
          {categoryList.map((item, i) => (
            <Link 
              to="/products" 
              state={{ category: item }} 
              key={i} 
              className="category-item" 
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="banner-section">
          <img src={banner} alt="banner" className="banner-img" />
          <div className="banner-content">
            <h3 className="banner-subtitle">Latest trending</h3>
            <h1 className="banner-title">Electronic items</h1>
            <button className="learn-btn" onClick={() => navigate("/products")}>Learn more</button>
          </div>
        </div>

        <div className="right-panel">
          <div className="login-box">
            <div className="user-info">
              <img src={photo} alt="user" className="login-icon" />
              <p className="login-text">
                {/* Dynamically greets the user if logged in */}
                {user ? `Hi, ${user.name}` : "Hi, user"}<br />
                {user ? "Welcome back!" : "let's get started"}
              </p>
            </div>
            
            {!user ? (
              <>
                <button className="join-btn" onClick={() => navigate("/login")}>Join now</button>
                <button className="login-btn" onClick={() => navigate("/login")}>Log in</button>
              </>
            ) : (
              <>
                <button className="join-btn" onClick={() => navigate("/profile")}>My Account</button>
                <button className="login-btn" onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload();
                }}>Log out</button>
              </>
            )}
          </div>

          <div className="orange-box" onClick={() => navigate("/login")} style={{cursor: 'pointer'}}>
            Get US $10 off <br />with a new<br /> supplier
          </div>

          <div className="green-box" onClick={() => navigate("/projects")} style={{cursor: 'pointer'}}>
            Send quotes with <br/>supplier<br/> preferences
          </div>
        </div>

      </div>
    </div>
  );
}

export default Hero;