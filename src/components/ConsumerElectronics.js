import React from "react";
import { Link } from "react-router-dom"; 
import "./ConsumerElectronics.css";

import electronicsBanner from "../assets/electronics-banner.png"; 
import watch from "../assets/watch.png";
import gopro from "../assets/gopro.png";
import headphone from "../assets/headphone.png";
import gaming from "../assets/gaming.png";
import laptop from "../assets/laptop.png";
import smartphone from "../assets/smartphone.png";
import kettle from "../assets/kettle.png";
import tablet from "../assets/tablet.png";

function ConsumerElectronics() {
  const electronics = [
    { id: "e1", search: "Watch", name: "Smart Watches", price: "19", img: watch },
    { id: "e2", search: "Camera", name: "Camera", price: "89", img: gopro },
    { id: "e3", search: "Headphone", name: "Headphones", price: "10", img: headphone },
    { id: "e4", search: "Tablet", name: "Tablets", price: "90", img: tablet },
    { id: "e5", search: "Gaming", name: "Gaming set", price: "35", img: gaming },
    { id: "e6", search: "Laptop", name: "Laptops & PC", price: "340", img: laptop },
    { id: "e7", search: "Smartphone", name: "Smartphones", price: "19", img: smartphone },
    { id: "e8", search: "Kettle", name: "Electric kettle", price: "240", img: kettle },
  ];

  return (
    <div className="electronics-wrapper">
      <div className="electronics-white-container">
        <div className="electronics-sidebar">
          <img src={electronicsBanner} alt="Electronics Banner" className="electronics-sidebar-bg" />
          <div className="electronics-sidebar-overlay">
            <h2 className="electronics-section-title">Consumer <br/> electronics and <br/> gadgets</h2>
            <button className="electronics-source-btn">Source now</button>
          </div>
        </div>

        <div className="electronics-categories-grid">
          {electronics.map((item) => (
            <Link 
              to={`/products?search=${encodeURIComponent(item.search)}`} 
              key={item.id} 
              className="electronics-category-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="electronics-card-info">
                <p className="electronics-card-name">{item.name}</p>
                <p className="electronics-price-text">From <br/> USD {item.price}</p>
              </div>
              <img src={item.img} alt={item.name} className="electronics-product-img" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ConsumerElectronics;