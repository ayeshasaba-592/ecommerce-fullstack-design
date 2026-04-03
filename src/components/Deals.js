import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./Deals.css";
import watch from "../assets/watch.png";
import laptop from "../assets/laptop.png";
import gopro from "../assets/gopro.png";
import headphone from "../assets/headphone.png";
import canon from "../assets/canon.png";

function Deals() {
  const navigate = useNavigate();

  // Logic: The 'name' property here is what the Search Filter uses.
  // These keywords are chosen to match the names/categories in your seeder.js.
  const dealItems = [
    { id: 301, name: "Watch", display: "Smart watches", badge: "-25%", img: watch },
    { id: 302, name: "Macbook", display: "Laptops", badge: "-15%", img: laptop },
    { id: 303, name: "GoPro", display: "GoPro cameras", badge: "-40%", img: gopro },
    { id: 304, name: "Headphone", display: "Headphones", badge: "-25%", img: headphone },
    { id: 305, name: "Canon", display: "Canon cameras", badge: "-25%", img: canon },
  ];

  return (
    <div className="deals-wrapper">
      <div className="deals-white-container">
        <h2 className="deals-main-title">Deals and offers</h2>

        <div className="deals-content-flex">
          <div className="deals-timer-section">
            <span className="deals-timer-label">Hygiene equipments</span>
            <div className="deals-timer-display">
              <div className="deals-timer-box">
                <span className="deals-timer-number">04</span>
                <span className="deals-timer-text">Days</span>
              </div>
              <div className="deals-timer-box">
                <span className="deals-timer-number">13</span>
                <span className="deals-timer-text">Hour</span>
              </div>
              <div className="deals-timer-box">
                <span className="deals-timer-number">34</span>
                <span className="deals-timer-text">Min</span>
              </div>
              <div className="deals-timer-box">
                <span className="deals-timer-number">56</span>
                <span className="deals-timer-text">Sec</span>
              </div>
            </div>
          </div>

          <div className="deals-discount-row">
            {dealItems.map((item) => (
              <div 
                key={item.id} 
                className="deals-discount-card" 
                // Navigate using the 'name' keyword which matches seeder names
                onClick={() => navigate(`/products?search=${encodeURIComponent(item.name)}`)}
                style={{ cursor: "pointer" }}
              >
                <img src={item.img} alt={item.display} className="deals-card-image" />
                <p>{item.display}</p>
                <span className="deals-discount-badge">{item.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deals;