import React from "react";
import { Link } from "react-router-dom"; 
import "./HomeOutdoor.css";

import bannerImg from "../assets/banner-home.png"; 
import chair from "../assets/soft-chair.png";
import sofa from "../assets/sofa-chair.png";
import dishes from "../assets/kitchen-dishes.png";
import pot from "../assets/pot.png";
import mixer from "../assets/kitchen-mixer.png";
import blender from "../assets/blender.png";
import appliance from "../assets/home-appliance.png";
import coffee from "../assets/coffee-maker.png";

function HomeOutdoor() {
  const categories = [
    { id: "h1", search: "Sofa", name: "Sofa & chairs", price: "19", img: chair },
    { id: "h2", search: "Lamp", name: "Lamps", price: "19", img: sofa },
    { id: "h3", search: "Dishes", name: "Kitchen dishes", price: "19", img: dishes },
    { id: "h4", search: "Pot", name: "Pots", price: "19", img: pot },
    { id: "h5", search: "Mixer", name: "Kitchen Juicer", price: "100", img: mixer },
    { id: "h6", search: "Coffee", name: "Coffee Maker", price: "39", img: blender }, 
    { id: "h7", search: "Appliance", name: "Home appliance", price: "19", img: appliance },
    { id: "h8", search: "Home", name: "Decorations", price: "10", img: coffee },
  ];

  return (
    <div className="home-wrapper">
      <div className="home-white-container">
        <div className="home-sidebar">
          <img src={bannerImg} alt="Home Banner" className="home-sidebar-bg" />
          <div className="home-sidebar-overlay">
            <h2 className="home-section-title">Home and <br/> outdoor</h2>
            <button className="home-source-btn">Source now</button>
          </div>
        </div>

        <div className="home-categories-grid">
          {categories.map((item) => (
            <Link 
              to={`/products?search=${encodeURIComponent(item.search)}`} 
              key={item.id} 
              className="home-category-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="home-card-info">
                <p className="home-card-name">{item.name}</p>
                <p className="home-price-text">From <br/> USD {item.price}</p>
              </div>
              <img src={item.img} alt={item.name} className="home-product-img" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeOutdoor;